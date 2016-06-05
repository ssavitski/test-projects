// BlogrollListView.js
// -------
define([
    "jquery",
    "underscore",
    "backbone",
    "../models/Blog",
    "../views/BlogView",
    "../views/AddBlogView",
    "text!templates/blogrollList.html",
    "mustache"
  ],

  function($, _, Backbone, Blog, BlogView, AddBlogView, template, Mustache){

    var BlogrollListView = Backbone.View.extend({

      tagName: "table",

      className: "table table-hover table-striped",

      // View constructor
      initialize: function() {

        this.collection.on("add", this.addBlog, this);
        this.render();
        this.addBlog();

      },

      // View Event Handlers
      events: {

      },

      addBlog: function() {
        var self = this;
        var $blogsList = this.$el.find(".blogs-list");
        $blogsList.html("");
        _.each(this.collection.toArray(), function(blog) {
           $blogsList.append((new BlogView({ model: blog })).$el);
        });
      },

      render: function() {

        var addNewBlog = new AddBlogView({
          collection: this.collection
        });
        this.template = Mustache.render(template, {});
        this.$el.html(this.template);
        this.$el.find("thead").append(addNewBlog.$el);
        return this;

      }

    });

    return BlogrollListView;

  }

);