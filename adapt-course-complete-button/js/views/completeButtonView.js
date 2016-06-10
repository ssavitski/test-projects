
define([
    'backbone',
    'coreJS/adapt',
    'handlebars'
], function(Backbone, Adapt, Handlebars) {

    var CompleteButtonView = Backbone.View.extend({

        initialize: function() {
            this.render();
            this.currentEvent = $('.complete-button-action').attr('data-event'); 
            console.log(Adapt);
        },

        events: {
            "click .complete-button-action": "onCompleteActivity"
        },

        onCompleteActivity: function() {
            Adapt.course.set("_isComplete", true);
            var currentEvent = (this.currentEvent) ? this.currentEvent : 'backButton';
            console.log("Complete", Adapt.course.get("_isComplete"));
            Adapt.trigger('navigation:' + currentEvent);
            this.$el.remove();
        },

        render: function() {
            // var data = this.model.toJSON();
            var data = {
                _isVisible: true,
                _completeButton: {
                    ariaLabel: "Complete Activity and navigate back by clicking here.",
                    buttonText: "Complete Activity"
                }
            }
            var template = Handlebars.templates['completeButton'];
            this.$el.html(template(data));
            return this;
        }

    });

    return CompleteButtonView;
        
});