//A resource is effectively a currency. It doesn't do anything inherently on its own.
var Resource = function(id, name, desc, icon, basemagnitude, modifiedmagnitude) {
	this.Id = id;//int, should be unique
	this.Name = name;//string
	this.Description = desc;//string
	this.Icon = icon;
	this.BaseMagnitude = basemagnitude;
	this.ModifiedMagnitude = modifiedmagnitude;
	
}