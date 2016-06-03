// HomeView.js
// -------
define([
    "jquery",
    "underscore",
    "backbone",
    "text!templates/home.html"
  ],

  function($, _, Backbone, template){

    var HomeView = Backbone.View.extend({

      // The DOM Element associated with this view
      tagName: "div",

      id: "home-page",

      // HomeView constructor
      initialize: function() {

        // Calls the view's render method
        this.render();

      },

      // Renders the view's template to the UI
      render: function() {

        this.$el.html(_.template(template));

        // Maintains chainability
        return this;

      }

    });

    // Returns the HomeView class
    return HomeView;

  }

);