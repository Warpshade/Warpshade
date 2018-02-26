//Basically, an activation criteria checks if the user has [value] of the item specified by TargetId, and returns a pass if it does. Attached to a trigger.
var ActivationCriteria = function(targetid, type, value, rule) {
	this.TargetId = targetid;//Target ID of the thing you want to attach the activation to.//int
	this.Type = type;//Type of the entity to be activated. (enum)
	this.Value = value;//Value related to the activation test. (string? int?)
	this.Rule = rule;//Activation rule. (enum)
}
