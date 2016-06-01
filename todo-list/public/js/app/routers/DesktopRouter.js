// DesktopRouter.js
// ----------------
define([
    "jquery",
    "underscore",
    "backbone",
    "models/TodoItem",
    "collections/TodoItems",
    "views/TodoItemView",
    "views/TodoItemsView",
    "views/NewTodoItemView"
  ],

    function($, _, Backbone, TodoItem, TodoItems, TodoItemView, TodoItemsView, NewTodoItemView) {

      var DesktopRouter = Backbone.Router.extend({

        initialize: function() {

          // Tells Backbone to start watching for hashchange events
          Backbone.history.start();

        },

        // All of your Backbone Routes (add more)
        routes: {

          // When there is no hash on the url, the home method is called
          "": "index"

        },

        index: function() {

          var todoItems = new TodoItems();
          todoItems.fetch();

          var todoItemsView = new TodoItemsView({
            collection: todoItems
          });

          var newTodoItemView = new NewTodoItemView({
            collection: todoItems
          });

          $(".view").html("")
                    .append(
            newTodoItemView.$el,
            todoItemsView.$el
          );

        }

      });

      // Returns the DesktopRouter class
      return DesktopRouter;

    }

);