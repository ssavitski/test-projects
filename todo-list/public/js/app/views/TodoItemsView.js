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

      currentPage: 1,

      // TodoItemsView constructor
      initialize: function(options) {

        var self = this;

        if (options.settings) {
          this.settings = options.settings;
          this.settings.on("goPage", function() {
            self.goPage();
          });
        }

        if (!(options && options.collection)) {
          throw new Error("Collection for TodoItemsView is not specified.");
        }

        this.collection.on("add", this.addTodoItem, this);
        this.collection.on("remove", this.removeTodoItem, this);

        // Calls the view's render method
        this.render();

      },

      goPage: function() {
        var self = this;
        self.$el.html("");
        this.collection.each(function(todoItem, index) {
          self.renderList(index, todoItem, self);
        });
      },

      addTodoItem: function(todoItem, todoItems) {
        var index = todoItems.indexOf(todoItem);
        this.renderList(index, todoItem, this);
      },

      removeTodoItem: function(todoItem) {
        this.$("#" + todoItem.cid).remove();
        this.goPage();
      },

      renderList: function(index, todoItem, context) {
        var currentPage = context.settings.currentPage - 1;
        var itemsForPage = context.settings.itemsForPage;
        if ((index >= itemsForPage * currentPage) &&
          (index < (itemsForPage * currentPage + itemsForPage))) {
          var view = new TodoItemView({ model: todoItem });
          context.$el.append(view.$el);
        }
      },

      // Renders the view's template to the UI
      render: function() {

        // Maintains chainability
        return this;

      }

    });

    // Returns the TodoItemsView class
    return TodoItemsView;

  }

);