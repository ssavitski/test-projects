// NavView.js
// -------
define([
    "jquery",
    "underscore",
    "backbone",
    "text!templates/navigation.html"
  ],

  function($, _, Backbone, template){

    var NavView = Backbone.View.extend({

      // The DOM Element associated with this view
      el: "#navigation",

      // NavView constructor
      initialize: function(options) {

        // Calls the view's render method
        this.render();

      },

      // NavView Event Handlers
      events: {
        "click #menu li": "clickMenuItem"
      },

      clickMenuItem: function(event) {
        $("#menu li").removeClass("active");
        $(event.target).parent().addClass("active");
      },

      // Renders the view's template to the UI
      render: function() {

        // Setting the view's template property using the Underscore template method
        this.template = _.template(template);

        // Dynamically updates the UI with the view's template
        this.$el.html(this.template);

        // Maintains chainability
        return this;

      }

    });

    // Returns the NavView class
    return NavView;

  }

);