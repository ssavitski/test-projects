// BlogView.js
// -------
define([
    "jquery",
    "backbone",
    "../models/Blog",
    "text!templates/blog.html",
    "mustache"
  ],

  function($, Backbone, Blog, template, Mustache){

    var BlogView = Backbone.View.extend({

      model: new Blog(),

      tagName: "tr",

      // View constructor
      initialize: function() {

        this.render();

      },

      // View Event Handlers
      events: {

      },
      
      render: function() {

        this.template = Mustache.render(template, this.model.toJSON());
        this.$el.html(this.template);
        return this;

      }

    });

    return BlogView;

  }

);