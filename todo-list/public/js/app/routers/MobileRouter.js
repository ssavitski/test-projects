// MobileRouter.js
// ---------------
define(["jquery", "backbone"],
        
    function($, Backbone) {

        var MobileRouter = Backbone.Router.extend({

            initialize: function() {

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {
                
                // When there is no hash bang on the url, the home method is called
                "": "index"

            },

            index: function() {

            }
    
        });

        // Returns the MobileRouter class
        return MobileRouter;

    }

);