// NewTodoItemView.js
// -------
define([
    "jquery",
    "underscore",
    "backbone",
    "text!templates/addnewitem.html"
  ],

  function($, _, Backbone, template){

    var TodoItemsView = Backbone.View.extend({

      // The DOM Element associated with this view
      tagName: "div",

      className: "input-group",

      id: "add-new-item",

      // TodoItemsView constructor
      initialize: function(options) {

        // Calls the view's render method
        this.render();

      },

      // TodoItemView Event Handlers
      events: {
        "click #add-new-item-action": "addItem",
        "keypress #add-new-item-field": "addItemByKeyPress"
      },

      addItemByKeyPress: function(event) {
        if (event.keyCode == 13) {
          this.addItem();
        }
      },

      addItem: function() {
        var $addItemField = this.$("#add-new-item-field");

        if (this.$("#add-new-item-field").val()) {
          this.collection.add({
            description: $addItemField.val()
          });
          $addItemField.val("")
                       .focus();
        }
      },

      // Renders the view's template to the UI
      render: function() {

        // Setting the view's template property using the Underscore template method
        this.template = _.template(template, {});

        // Dynamically updates the UI with the view's template
        this.$el.html(this.template);

        // Maintains chainability
        return this;

      }

    });

    // Returns the TodoItemsView class
    return TodoItemsView;

  }

);