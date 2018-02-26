var SeedUpgrades = function() {
	var upgradeArray = new Array();
	
	upgrade0 = new Upgrade(1,"Smaller Currency","Same agreed-upon value, less work cutting it. Aces!","fa-cube", [{ResourceId:1,Amount:100}],1,1,1,2,2,true);
	upgradeArray.push(upgrade0);
	
	upgrade1 = new Upgrade(2,"Wizards of the Coin","Sages of cash to increase your stash.","fa-cube", [{ResourceId:3,Amount:100}],1,1,1,2,2,false);
	upgradeArray.push(upgrade1);
	
	return upgradeArray;
}