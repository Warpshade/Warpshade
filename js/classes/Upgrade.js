//An upgrade is a one-time object that takes resources and affects something else, typically processor output.
var Upgrade = function(id,name,desc,costs,targettype,targetid,purpose,modifiermethod,magnitude) {
	this.Id = id;//int, should be unique
	this.Name = name;//string
	this.Description = desc;//string
	this.Costs = costs;//collection of ResourceGroup entities
	this.TargetType = targettype;//Enum, determines what type of entity this upgrade affects
	this.TargetId = targetid;//ID of the upgrade's target
	this.Purpose = purpose;//Enum, determining what this upgrade does (affect cost, production rate, etc)
	this.ModifierMethod = modifiermethod;//Enum, determining how the upgrade modifies the target - additive, multiplicative, etc
	this.Magnitude = magnitude;//float or int - how much does this upgrade affect the target?
};