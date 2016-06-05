// Blog.js
// --------
define(["jquery", "backbone"],

  function($, Backbone) {

    var Blog = Backbone.Model.extend({

      initialize: function() {

      },

      defaults: {
        author: "",
        title: "",
        url: ""
      },

      validate: function(attrs) {

      }

    });

    return Blog;

  }

);
