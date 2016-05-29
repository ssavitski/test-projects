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
		console.log("Car with registration number " + this.get("registrationNumber") + " started!");
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

nissan.start();

var Vehicles = Backbone.Collection.extend({
  model: Vehicle
});

var cars = new Vehicles([
  new Vehicle({ registrationNumber: "XLI887", colour: "Blue" }),
  new Vehicle({ registrationNumber: "ZNP123", colour: "Blue" })
]);

cars.add( new Vehicle({ registrationNumber: "XUV456", colour: "Grey" }) );

var blueCars = cars.where({ colour: "Blue" });
console.log(blueCars);

var brokenCar = cars.findWhere({ registrationNumber: "XLI887" });
console.log(brokenCar);

cars.remove(brokenCar);
console.log(cars.toJSON());

cars.each(function(car) {
  console.log(car);
});