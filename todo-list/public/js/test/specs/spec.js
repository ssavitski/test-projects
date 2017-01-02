// Jasmine Unit Testing Suite
// --------------------------
define(["jquery", "backbone", "routers/DesktopRouter", "routers/MobileRouter", "jasminejquery"],

    function($, Backbone, DesktopRouter, MobileRouter) {

        // Test suite that includes all of the Jasmine unit tests   
        describe("Backbone-Require-Boilerplate (BRB)", function() {

            // Backbone View Suite: contains all tests related to views
            describe("Backbone views", function() {


            }); // End of the View test suite

            // Backbone Model Suite: contains all tests related to models
            describe("Backbone models", function() {



            }); // End of the Model test suite

        // Backbone Collection Suite: contains all tests related to collections
        describe("Backbone collections", function() {


        }); // End of the Collection test suite

        // Backbone Desktop Router Suite: contains all tests related to Desktop routers
        describe("Backbone desktop routers", function () {

            // Runs before every Desktop Router spec
            beforeEach(function () {

                // Stops the router from listening to hashchange events (Required because Backbone will only allow you to run Backbone.history.start() once for each page load.)
                Backbone.history.stop();

                // Instantiates a new Router instance
                this.router = new DesktopRouter();

                // Creates a Jasmine spy
                this.routeSpy = jasmine.createSpy("home");

                // When the route index method is called, the Jasmine spy is also called
                this.router.on("route:index", this.routeSpy);

            });

            it("should call the desktop router home method when there is no hash on the url", function() {

                // Navigates to a different route
                this.router.navigate("elsewhere");

                // Navigates to the default route
                this.router.navigate("", { trigger: true });

                // Expects the Jasmine spy to have been called
                expect(this.routeSpy).toHaveBeenCalled();

            });

        }); // End of the Desktop Router test suite

        // Backbone Mobile Router Suite: contains all tests related to Mobile routers
        describe("Backbone mobile routers", function () {

            // Runs before every Mobile Router spec
            beforeEach(function () {

                // Stops the router from listening to hashchange events (Required because Backbone will only allow you to run Backbone.history.start() once for each page load.)
                Backbone.history.stop();

                // Instantiates a new Router instance
                this.router = new MobileRouter();

                // Creates a Jasmine spy
                this.routeSpy = jasmine.createSpy("home");

                // When the route index method is called, the Jasmine spy is also called
                this.router.on("route:index", this.routeSpy);

            });

            it("should call the mobile router home method when there is no hash on the url", function() {

                // Navigates to a different route
                this.router.navigate("elsewhere");

                // Navigates to the default route
                this.router.navigate("", { trigger: true });

                // Expects the Jasmine spy to have been called
                expect(this.routeSpy).toHaveBeenCalled();

            });

        }); // End of the Mobile Router test suite

    }); // End of the BRB test suite

});