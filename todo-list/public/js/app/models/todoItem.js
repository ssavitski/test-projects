// TodoItem.js
// --------
define(["jquery", "backbone"],

  function($, Backbone) {

    // Creates a new Backbone TodoItem class object
    var TodoItem = Backbone.Model.extend({

      // TodoItem Constructor
      initialize: function() {

      },

      // Default values for all of the Model attributes
      defaults: {
        isCompleted: false
      },

      // Gets called automatically by Backbone when the set and/or save methods are called
      validate: function(attrs) {
        if (!attrs.description) {
          return "Description is required.";
        }
      },

      toggle: function() {
        this.set("isCompleted", !this.get("isCompleted"));
      }

    });

    // Returns the TodoItem class
    return TodoItem;

  }

);
