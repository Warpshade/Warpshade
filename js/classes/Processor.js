//A processor is an element which takes in zero or more Resources, and produces resources as a result.

var Processor = function(id,name,desc,icon,costs,intakeresources,producedresources,buyable) {
	this.Id = id;//int, should be unique
	this.Name = name;//string
	this.Description = desc;//string
	this.Icon = icon;
	this.Costs = costs;//collection of ResourceGroup entities
	this.IntakeResources = intakeresources;//collection of ResourceGroup entities
	this.ProducedResources = producedresources;//Collection of ResourceGroup entities
	this.Buyable = buyable;
};