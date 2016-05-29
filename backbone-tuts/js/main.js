"use strict";

var Vehicle = Backbone.Model.extend({
	idAttribute: "registrationNumber",
	validate: function(attrs) {
		if ((attrs.registrationNumber == null) ||
				(attrs.registrationNumber == undefined)) {
			return "Registration number must be identified!";
		}
	},
	start: function() {
		console.log("Vehicle started!");
	},
	urlRoot: "/api/vehicles"
});

var Car = Vehicle.extend({
	start: function() {
		console.log("Car with registration number " + this.registrationNumber + "started!");
	}
});

var nissan = new Car({
	registrationNumber: "XLI887",
	color: "Blue"
});

nissan.unset("registrationNumber");

if (!nissan.isValid()) {
	console.log(nissan.validationError);
}

nissan.set("registrationNumber", "XLI887");

if (nissan.isValid()) {
	console.log("Nissan is valid!");
}
