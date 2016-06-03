// TodoItem.js
// --------
define([
    "jquery",
    "backbone"
  ],

  function($, Backbone) {

    // Creates a new Backbone TodoItem class object
    var TodoItem = Backbone.Model.extend({

      // TodoItem Constructor
      initialize: function() {

      },

      urlRoot: "http://jsonplaceholder.typicode.com/todos",

      // Default values for all of the Model attributes
      defaults: {
        completed: false
      },

      // Gets called automatically by Backbone when the set and/or save methods are called
      validate: function(attrs) {
        if (!attrs.title) {
          return "Title is required.";
        }
      },

      toggle: function() {
        this.set("completed", !this.get("completed"));
        this.save();
      }

    });

    // Returns the TodoItem class
    return TodoItem;

  }

);
