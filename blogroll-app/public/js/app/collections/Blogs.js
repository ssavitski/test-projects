// Blogs.js
// -------------
define(["jquery","backbone","../models/Blog"],

  function($, Backbone, Blog) {

    var Blogs = Backbone.Collection.extend({
      model: Blog
    });

    return Blogs;

  }

);