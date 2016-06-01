// DesktopRouter.js
// ----------------
define([
    "jquery",
    "underscore",
    "backbone",
    "models/Model",
    "views/View",
    "collections/Collection",
    "collections/TodoItems",
    "views/TodoItemView",
    "views/TodoItemsView",
    "views/NewTodoItemView",
    "models/TodoItem"
  ],

    function($, _, Backbone, Model, View, Collection, TodoItems, TodoItemView, TodoItemsView, NewTodoItemView, TodoItem) {

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

          // Instantiates a new view which will render the header text to the page
          new View();

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