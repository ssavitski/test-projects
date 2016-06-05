// AddBlogView.js
// -------
define([
    "jquery",
    "backbone",
    "../models/Blog",
    "text!templates/addblog.html",
    "mustache"
  ],

  function($, Backbone, Blog, template, Mustache){

    var AddBlogView = Backbone.View.extend({

      tagName: "tr",

      initialize: function() {
        
        this.render();

      },

      events: {
        "click .add-blog": "addBlog"
      },

      addBlog: function() {
        var $author = $(".author-field");
        var $title = $(".title-field");
        var $url = $(".url-field");
        this.collection.add(new Blog({
          author: $author.val(),
          title: $title.val(),
          url: $url.val()
        }), { at: 0 });
        $author.val("");
        $title.val("");
        $url.val("");
      },

      render: function() {

        this.template = Mustache.render(template, {});
        this.$el.html(this.template);
        return this;

      }

    });

    return AddBlogView;

  }

);