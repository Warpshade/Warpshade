var SeedProcessors = function() {
	var processorArray = new Array();
	
	processor0 = new Processor(1,"Find a penny","Pick it up. Use it to buy more pennies. Magic.","fa-cube",new Array(),new Array(),[{ResourceId:1,Amount:1}],false);
	
	processorArray.push(processor0);
	
	processor1 = new Processor(2,"Coin Factory","Makes coins. Slowly.","fa-industry",[{ResourceId:1,Amount:10}],new Array(),[{ResourceId:1,Amount:0.1}],true);
	
	processorArray.push(processor1);
	
	processor2 = new Processor(3,"Wood Factory","Makes Wood. Slowly.","fa-industry",[{ResourceId:1,Amount:20}],new Array(),[{ResourceId:2,Amount:0.1}],true);
	
	processorArray.push(processor2);
	
	processor3 = new Processor(4,"Wood to Rock Factory","Makes rocks from Wood. How? Magic.","fa-square",[{ResourceId:2,Amount:10}],[{ResourceId:2,Amount:0.2}],[{ResourceId:3,Amount:0.5}],true);
	
	processorArray.push(processor3);
	
	return processorArray;
}