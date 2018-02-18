//A user ties their resources, processors, upgrades, etc, to a specific entity.

function User(id, name, email, resources, processors, upgrades) {
	this.Id = id;
	this.Name = name;
	this.Email = email;
	this.Resources = resources; //Array of collected resources, resourcegroups.
	this.Processors = processors; //Array of collected processors, processorgroups.
	this.Upgrades = upgrades //Array of collected upgrades, upgradegroups.;
	
	
}