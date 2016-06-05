// DesktopRouter.js
// ----------------
define(["jquery", "backbone", "../models/Blog", "../views/BlogrollListView", "../collections/Blogs"],

  function($, Backbone, Blog, BlogrollListView, Blogs) {

    var DesktopRouter = Backbone.Router.extend({

      initialize: function() {

        this.viewContainer = $(".view");

        // Tells Backbone to start watching for hashchange events
        Backbone.history.start();

      },

      // All of your Backbone Routes (add more)
      routes: {

        "": "index",
        "blogroll-list": "blogrollList",
        "*other": "blogrollList"

      },

      index: function() {


      },

      blogrollList: function() {

        var blog1 = new Blog({
          author: "Michael",
          title: "Michael\'s Blog",
          url: "http://michaelsblog.com"
        });

        var blog2 = new Blog({
          author: "John",
          title: "John\'s Blog",
          url: "http://johnsblog.com"
        });

        var blogs = new Blogs([
          blog1, blog2
        ]);

        var view = new BlogrollListView({
          collection: blogs
        });
        
        this.viewContainer.html(view.$el);

      }

    });

    // Returns the DesktopRouter class
    return DesktopRouter;

  }

);