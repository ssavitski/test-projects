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
    "views/NewTodoItemView",
    "views/PaginationView",
    "views/HomeView",
    "views/NavView"
  ],

    function($, _, Backbone, TodoItem, TodoItems, TodoItemView, TodoItemsView, NewTodoItemView, PaginationView, HomeView, NavView) {

      var DesktopRouter = Backbone.Router.extend({

        initialize: function() {

          new NavView();

          this.viewContainer = $(".view");

          // Tells Backbone to start watching for hashchange events
          Backbone.history.start();

        },

        itemsForPage: 15,

        // All of your Backbone Routes
        routes: {

          // When there is no hash on the url, the home method is called
          "": "home",

          "todoItems" : "todoItems",

          "*other": "index"

        },

        home: function() {

          this.viewContainer.html("");
          var homeView = new HomeView();
          this.viewContainer.append(homeView.$el);

        },

        todoItems: function() {

          this.viewContainer.html("");

          var self = this;
          var settings = _.extend({}, Backbone.Events);
          settings.itemsForPage = this.itemsForPage;
          settings.currentPage = 1;
          var todoItems = new TodoItems();
          var options = {
            collection: todoItems,
            settings: settings
          };

          todoItems.fetch({
            success: function() {

              var newTodoItemView = new NewTodoItemView(options);
              var pagination = new PaginationView(options);

              self.viewContainer.append(
                newTodoItemView.$el,
                todoItemsView.$el,
                pagination.$el
              );

            }
          });

          var todoItemsView = new TodoItemsView(options);

        }

      });

      // Returns the DesktopRouter class
      return DesktopRouter;

    }

);