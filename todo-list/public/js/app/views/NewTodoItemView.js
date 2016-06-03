// NewTodoItemView.js
// -------
define([
    "jquery",
    "underscore",
    "backbone",
    "models/TodoItem",
    "text!templates/addnewitem.html",
    "mustache"
  ],

  function($, _, Backbone, TodoItem, template, Mustache){

    var NewTodoItemView = Backbone.View.extend({

      // The DOM Element associated with this view
      tagName: "div",

      className: "input-group",

      id: "add-new-item",

      // NewTodoItemView constructor
      initialize: function(options) {

        if (options.settings) {
          this.settings = options.settings;
        }

        if (!(options && options.collection)) {
          throw new Error("Collection for PaginationView is not specified.");
        }

        this.collection.on("add", this.addToCollection, this);

        // Calls the view's render method
        this.render();

      },

      // NewTodoItemView Event Handlers
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
          var todoItem = new TodoItem({
            title: $addItemField.val()
          });
          var currentPage = this.settings.currentPage - 1;
          var itemsForPage = this.settings.itemsForPage;
          todoItem.save();
          this.collection.add(todoItem, { at: currentPage * itemsForPage });

          $addItemField.val("")
                       .focus();
        }
      },

      addToCollection: function() {
        this.settings.trigger("goPage");
      },

      // Renders the view's template to the UI
      render: function() {

        // Setting the view's template property using the Mustache template method
        this.template = Mustache.render(template, {});

        // Dynamically updates the UI with the view's template
        this.$el.html(this.template);

        // Maintains chainability
        return this;

      }

    });

    // Returns the NewTodoItemView class
    return NewTodoItemView;

  }

);