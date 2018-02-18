var App = {
	
	getResource: function(resourceId) {
		return this.RepoResources.find(function(elem) {
			
			return elem.Id == resourceId;
		});
	},
	
	getProcessor: function(processorId) {
		return this.RepoProcessors.find(function(elem) {
			
			return elem.Id == processorId;
		});
	},
	
	getUser: function(userId) {
		return this.RepoUsers.find(function(elem) {			
			return elem.Id == userId;
		});
	},
	
	findResourceFromUser: function(user,resourceId) {
		return user.Resources.find(function(elem) {
			return elem.ResourceId == resourceId;
		});
	},
	
	findProcessorFromUser: function(user,processorId) {
		return user.Processors.find(function(elem) {
			return elem.ProcessorId == processorId;
		});
	},
	
	updateResources: function(userId,appIntervals) {
		var app = this;		
		var user = app.getUser(userId);
		
		user.Processors.forEach(function(currentProc,procIndex,procArr) {
			
			var resolvedProc = app.getProcessor(currentProc.ProcessorId);
			var processorsRunning = true;
			var highestAvailableRatio = 1.00000;
			//Test to see if the processors are able to take in whatever they take in.			
			resolvedProc.IntakeResources.forEach(function(currentProd,prodIndex,prodArr) {
				var requestedResource = user.Resources.find(function(elem) {
					return elem.ResourceId == currentProd.ResourceId;
				});
				if(requestedResource == undefined) {
					var newResource = new ResourceGroup(currentProd.ResourceId,0);
					user.Resources.push(newResource);
					requestedResource = app.findResourceFromUser(user,currentProd.ResourceId);
				}
				if(requestedResource.Amount < currentProd.Amount) {
					//If there isn't even enough resource for one processor then don't run.
					processorsRunning = false;
				}
				else if(requestedResource.Amount < currentProd.Amount * currentProc.Amount * appIntervals) {
					//If there's enough for one, but not enough for all...
					var availableTotal = requestedResource.Amount;
					var requestedTotal = currentProd.Amount * currentProc.Amount * appIntervals;
					var testRatio = availableTotal/requestedTotal;
					if(testRatio.toFixed(5) <= highestAvailableRatio.toFixed(5)) {
						highestAvailableRatio.toFixed(5) = testRatio.toFixed(5);
						//Work out the most you can make with the available amount.
					}
				}
			});
			if(processorsRunning) {
				resolvedProc.IntakeResources.forEach(function(currentProd,prodIndex,prodArr) {
					var requestedTotal = (currentProd.Amount * currentProc.Amount * appIntervals * highestAvailableRatio);
					var targetResource = app.findResourceFromUser(user,currentProd.ResourceId);
					console.log("Processor "+resolvedProc.Name+" running at "+highestAvailableRatio*100+"% efficiency.")
					console.log("Subtracting "+requestedTotal+" from "+targetResource.Amount+", leaving "+(requestedTotal - targetResource.Amount));
					targetResource.Amount -= requestedTotal;
					
				});
				resolvedProc.ProducedResources.forEach(function(currentProd,prodIndex,prodArr) {
					var targetResource = app.findResourceFromUser(user,currentProd.ResourceId);
					if(targetResource == undefined) {
						var newResource = new ResourceGroup(currentProd.ResourceId,0);
						user.Resources.push(newResource);
						targetResource = app.findResourceFromUser(user,currentProd.ResourceId);
					}
					targetResource.Amount += (currentProd.Amount * currentProc.Amount * appIntervals * highestAvailableRatio);
				});
			}
			
			
		});
	},
	
	userTryBuyBuilding: function(user, procId) {
		var app = this;		
		var resolvedProc = app.getProcessor(procId);
		var validBuy = true;
		console.log("attempting to buy...");
		//First, go through the costs and make sure the user has the resources to buy.
		resolvedProc.Costs.forEach(function(currCost,costInd,costArr) {
			userRes = app.findResourceFromUser(user,currCost.ResourceId);
			if(userRes == undefined) {
				console.log("Unable to find user resource with ID:",currCost.ResourceId);
				validBuy = false;
				return;
			}
			if(userRes.Amount < currCost.Amount) {
				console.log("Unable to find sufficient user resource with ID:",currCost.ResourceId);
				validBuy = false;
				return;
			}
		});
		if(validBuy) {
			//Once we know we can buy it, go back through and subtract the resources.
			resolvedProc.Costs.forEach(function(currCost,costInd,costArr) {
				userRes = app.findResourceFromUser(user,currCost.ResourceId);
				if(userRes == undefined) {
					Console.log("Exceptional behaviour");
					return;
				}
				else if(userRes.Amount < currCost.Amount) {
					Console.log("Exceptional behaviour");
					return;
				}
				else {
					userRes.Amount -= currCost.Amount;
				}
			});
			//And now add the processor to the user.
			var targetProcessor = app.findProcessorFromUser(user,procId);
			if(targetProcessor == undefined) {
				newProcessor = {ProcessorId:procId,Amount:1};
				user.Processors.push(newProcessor);
			}
			else {
				targetProcessor.Amount += 1;
			}
		}		
	},
	
	renderBuilding: function() {
		var app = this;
		var building = $(".menu-building");
		var menuHtml = "";
		
		
		this.RepoProcessors.forEach(function(currentProcessor, index, arr) {
			if(currentProcessor.Buyable) {
				menuHtml = menuHtml + "<div class = \"menu-item building cols\" data-id = \""+currentProcessor.Id+"\">";
					menuHtml = menuHtml + "<div class = \"menu-icon col-1s\"><i class=\"fas fa-2x "+currentProcessor.Icon+"\"></i></div>";
					menuHtml = menuHtml + "<div class = \"col-2l\">";
						menuHtml = menuHtml + "<div class = \"menu-top\">";
							menuHtml = menuHtml + "<div class = \"menu-name\">"+currentProcessor.Name+"</div>";
							
							currentProcessor.Costs.forEach(function(currentResource,resIndex,resArr) {
								var resolvedRes = app.getResource(currentResource.ResourceId);
								
								menuHtml = menuHtml + "<div class = \"menu-cost\" data-id = \""+resolvedRes.Id+"\">"+currentResource.Amount+"<i class=\"fas "+resolvedRes.Icon+"\"></i></div>"
							});
							
						menuHtml = menuHtml + "</div>";
						menuHtml = menuHtml + "<div class = \"menu-bottom\">";
							menuHtml = menuHtml + "<div class = \"menu-desc\">"+currentProcessor.Description+"</div>";
						menuHtml = menuHtml + "</div>";
					menuHtml = menuHtml + "</div>";
				menuHtml = menuHtml + "</div>"
			}
			
			
		});
		$(building).html(menuHtml);
		
	},
	
	renderStatus: function() {
		var app = this;
		var stat = $(".menu-status");
		var menuHtml = "";
		
		menuHtml = menuHtml = "<h2>Resources</h2>"
		menuHtml = menuHtml + "<div class = \"resource-block\">"
		this.RepoUsers[0].Resources.forEach(function(currentResource,resIndex,resArr) {
			var resolvedRes = app.getResource(currentResource.ResourceId);
			menuHtml = menuHtml + "<div class = \"resource-item\"><i class=\"fas "+resolvedRes.Icon+"\"></i>"+resolvedRes.Name+": "+(currentResource.Amount)+"</div>"
			
		});
		menuHtml = menuHtml + "</div>";
		
		menuHtml = menuHtml + "<h2>Processors</h2>"
		menuHtml = menuHtml + "<div class = \"processor-block\">"
		this.RepoUsers[0].Processors.forEach(function(currentProcessor,procIndex,procArr) {
			var resolvedProc = app.getProcessor(currentProcessor.ProcessorId);
			menuHtml = menuHtml + "<div class = \"resource-item\"><i class=\"fas "+resolvedProc.Icon+"\"></i>"+resolvedProc.Name+": "+(currentProcessor.Amount)+"</div>"
			
		});
		menuHtml = menuHtml + "</div>";
		
		//console.log(menuHtml);
		
		$(stat).html(menuHtml);
		
	},
	
	initialize: function() {
		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);		
		
	},
	
	onDeviceReady: function() {
		var app = this;
		var userId = 1;
		this.tickInterval = 100;		
		this.lastTick = Date.now();
		this.currTick = Date.now();
		this.ticksPassed = 0;
		
		this.RepoUsers = SeedUsers();
		this.RepoResources = SeedResources();
		this.RepoProcessors =  SeedProcessors();
		this.RepoUpgrades = SeedUpgrades();
		var appUser = app.getUser(userId);
		
		$(".menu-tabs").on("click",".tab",function(e) {
			var menuType = $(this).attr("data-tab");
			$(".menu-body .menu").hide();			
			if(menuType == "building") {
				//console.log(app);
				app.renderBuilding();				
			}
			else if(menuType == "status") {
				app.renderStatus();
			}
			$(".menu-"+menuType.toString()).show();
		});
		
		$(".menu-body").on("click",".menu-item.building",function(e) {
			var dataId = $(this).attr("data-id");
			app.userTryBuyBuilding(appUser,dataId);
		});
		$(".menu-body .menu").hide();
		
		var mainLoop = setInterval(function() {
			app.lastTick = app.currTick;
			app.currTick = Date.now();
			app.ticksPassed = (app.currTick - app.lastTick)/app.tickInterval;//Amount of intervals
			app.updateResources(userId,app.ticksPassed);
			//app.renderBuilding();
			app.renderStatus();
		},app.tickInterval);
	},
	
	
}

App.initialize();