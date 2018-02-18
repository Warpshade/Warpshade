var SeedResources = function() {
	var resourceArray = new Array();
	
	var resource1 = new Resource(1,"Coin","A shiny coin.","fa-cubes",1,1);	
	resourceArray.push(resource1);
	var resource2 = new Resource(2,"Wood","Science has yet to determine how many of these a woodchuck could chuck.","fa-tree",1,1);
	resourceArray.push(resource2);
	var resource2 = new Resource(3,"Coal","The gift of the naughti.","fa-caret-square-up",1,1);
	resourceArray.push(resource2);
	
	
	return resourceArray;
}