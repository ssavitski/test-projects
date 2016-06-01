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
    "models/TodoItem"
  ],

    function($, _, Backbone, Model, View, Collection, TodoItems, TodoItemView, TodoItemsView, TodoItem) {

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

          var todoItems = new TodoItems([
            new TodoItem({ description: "Complete learning course" }),
            new TodoItem({ description: "Complete adapt framework learning" })
          ]);

          var todoItemsView = new TodoItemsView({
            collection: todoItems
          });

          $(".view").html(todoItemsView.$el);

        }

      });

      // Returns the DesktopRouter class
      return DesktopRouter;

    }

);