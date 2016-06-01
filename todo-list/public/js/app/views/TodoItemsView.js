// TodoItemsView.js
// -------
define([
    "jquery",
    "underscore",
    "backbone",
    "views/TodoItemView"
  ],

  function($, _, Backbone, TodoItemView){

    var TodoItemsView = Backbone.View.extend({

      // The DOM Element associated with this view
      tagName: "ul",

      id: "todo-items",

      className: "list-group",

      // TodoItemsView constructor
      initialize: function(options) {

        this.collection.on("add", this.addTodoItem, this);

        if (!(options && options.collection)) {
          throw new Error("Collection for TodoItemsView is not specified.");
        }

        // Calls the view's render method
        this.render();

      },

      // TodoItemView Event Handlers
      events: {

      },

      addTodoItem: function(todoItem) {
        var view = new TodoItemView({ model: todoItem });
        this.$el.append(view.$el);
      },

      // Renders the view's template to the UI
      render: function() {

        var self = this;
        this.collection.each(function(todoItem) {
          var view = new TodoItemView({ model: todoItem });
          self.$el.append(view.$el);
        });

        // Maintains chainability
        return this;

      }

    });

    // Returns the TodoItemsView class
    return TodoItemsView;

  }

);