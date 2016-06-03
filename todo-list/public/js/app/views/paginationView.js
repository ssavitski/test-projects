// PaginationView.js
// -------
define([
    "jquery",
    "underscore",
    "backbone",
    "models/TodoItem",
    "text!templates/pagination.html"
  ],

  function($, _, Backbone, TodoItem, template){

    var PaginationView = Backbone.View.extend({

      // The DOM Element associated with this view
      tagName: "nav",

      id: "pagination",

      // PaginationView constructor
      initialize: function(options) {

        if (options.settings) {
          this.settings = options.settings;
          this.pageCount = function() {
            return Math.ceil(this.collection.length / this.settings.itemsForPage);
          }
        }

        if (!(options && options.collection)) {
          throw new Error("Collection for PaginationView is not specified.");
        }

        this.collection.on("remove", this.render, this);
        this.collection.on("add", this.render, this);

        // Calls the view's render method
        this.render();

      },

      // PaginationView Event Handlers
      events: {
        "click .item": "goPage",
        "click .prev-item": "goPrev",
        "click .next-item": "goNext"
      },

      goPrev: function() {
        if (this.settings.currentPage > 1) {
          var currentPage = this.settings.currentPage - 1;
          this.renderNav($("a[data-number='" + currentPage + "']").parent(), currentPage, this);
        }
        return false;
      },

      goNext: function() {
        if (this.settings.currentPage < this.pageCount()) {
          var currentPage = this.settings.currentPage + 1;
          this.renderNav($("a[data-number='" + currentPage + "']").parent(), currentPage, this);
        }
        return false;
      },

      goPage: function(event) {
        this.renderNav($(event.target).parent(), +$(event.target).attr("data-number"), this);
        return false;
      },

      renderNav: function($element, currentPage, context) {
        context.settings.currentPage = currentPage;
        context.$el.find("li").removeClass("active");
        $element.addClass("active");
        context.settings.trigger("goPage");
      },

      // Renders the view's template to the UI
      render: function() {

        // Setting the view's template property using the Underscore template method
        this.template = _.template(template, {
          pageCount: this.pageCount(),
          currentPage: this.settings.currentPage
        });

        // Dynamically updates the UI with the view's template
        this.$el.html(this.template);

        // Maintains chainability
        return this;

      }

    });

    // Returns the TodoItemsView class
    return PaginationView;

  }

);