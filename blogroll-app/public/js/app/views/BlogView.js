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

        this.model.on("change", this.render, this);
        this.render();

      },

      // View Event Handlers
      events: {
        "click .edit-button": "edit",
        "click .update-button": "update",
        "click .cancel-button": "cancel",
        "click .delete-button": "delete"
      },

      edit: function() {
        var author = this.$(".author").text();
        var title = this.$(".title").text();
        var url = this.$(".url").text();
        this.$(".author").html("<input type=\"text\" class=\"edit-author form-control\" value=\"" + author + "\" />");
        this.$(".title").html("<input type=\"text\" class=\"edit-title form-control\" value=\"" + title + "\" />");
        this.$(".url").html("<input type=\"text\" class=\"edit-url form-control\" value=\"" + url + "\" />");
        this.$(".update-button, .cancel-button").removeClass("hide");
        this.$(".edit-button, .delete-button").addClass("hide");
      },

      cancel: function() {
        this.render();
      },

      delete: function() {
        this.model.destroy();
      },

      update: function() {
        this.model.set({
          author: $('.edit-author').val(),
          title: $('.edit-title').val(),
          url: $('.edit-url').val()
        });
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