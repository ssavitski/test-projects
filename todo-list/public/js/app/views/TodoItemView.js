// TodoItemView.js
// -------
define([
    "jquery",
    "underscore",
    "backbone",
    "text!templates/todoItem.html",
    "mustache"
  ],

  function($, _, Backbone, template, Mustache){

    var TodoItemView = Backbone.View.extend({

      // The DOM Element associated with this view
      tagName: "li",

      className: "list-group-item",

      // TodoItemView constructor
      initialize: function(options) {

        if (!(options && options.model)) {
          throw new Error("model for TodoItemView is not specified.");
        }

        this.$el.attr("id", options.model.cid);
        if (options.model.get("completed")) {
          this.$el.addClass("list-group-item-warning");
        }

        // Calls the view's render method
        this.render();

      },

      // TodoItemView Event Handlers
      events: {
        "change .task-status": "changeStatus",
        "click .removeItem": "removeTodoItem"
      },

      changeStatus: function() {
        this.model.toggle();
        this.$el.toggleClass("list-group-item-warning", this.model.get("completed"));
      },

      removeTodoItem: function() {
        this.model.destroy();
      },

      // Renders the view's template to the UI
      render: function() {

        // Setting the view's template property using the Mustache template method
        this.template = Mustache.render(template, {
          id: this.model.cid,
          todoItem: this.model.toJSON()
        });

        // Dynamically updates the UI with the view's template
        this.$el.html(this.template);

        // Maintains chainability
        return this;

      }

    });

    // Returns the TodoItemView class
    return TodoItemView;

  }

);