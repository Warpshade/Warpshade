var SeedUsers = function() {
	var userArray = new Array();
	
	var user1 = new User(1, "Test", "test@me.net", [{ResourceId:1,Amount:0}], [{ProcessorId:2,Amount:1}], new Array());
	
	userArray.push(user1);
	return userArray;
}