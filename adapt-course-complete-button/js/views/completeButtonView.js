define([
  'backbone',
  'coreJS/adapt',
  'handlebars'
], function (Backbone, Adapt, Handlebars) {

  var CompleteButtonView = Backbone.View.extend({

    initialize: function () {
      this.render();
      this.currentEvent = $('.complete-button-action').attr('data-event');
    },

    events: {
      "click .complete-button-action": "onCompleteActivity"
    },

    setCourseCompleteAndReturn: function () {
      Adapt.course.set("_isComplete", true);
      var currentEvent = (this.currentEvent) ? this.currentEvent : 'backButton';
      Adapt.trigger('navigation:' + currentEvent);
    },

    onCompleteActivity: function () {
      // this.setCourseCompleteAndReturn();
      window.top.postMessage('exit', '*');
      this.$el.remove();
    },

    render: function () {
      var template = Handlebars.templates['completeButton'];
      this.$el.html(template(this.model));
      return this;
    }

  });

  return CompleteButtonView;

});