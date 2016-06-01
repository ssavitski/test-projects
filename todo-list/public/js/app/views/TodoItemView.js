// TodoItemView.js
// -------
define([
    "jquery",
    "underscore",
    "backbone"
  ],

  function($, _, Backbone){

    var TodoItemView = Backbone.View.extend({

      // The DOM Element associated with this view
      tagName: "li",

      // TodoItemView constructor
      initialize: function(options) {

        if (!(options && options.model)) {
          throw new Error("model for TodoItemView is not specified.");
        }

        // Calls the view's render method
        this.render();

      },

      // TodoItemView Event Handlers
      events: {

      },

      // Renders the view's template to the UI
      render: function() {

        this.$el.html(this.model.get("description"));

        // Maintains chainability
        return this;

      }

    });

    // Returns the TodoItemView class
    return TodoItemView;

  }

);