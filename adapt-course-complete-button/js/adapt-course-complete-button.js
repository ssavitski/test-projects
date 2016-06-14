/*
* adapt-course-complete-button
* License
* Maintainers - Siarhei Savitski <siarhei.savitski@instinctools.ru>
*/
define([
    'backbone',
    'coreJS/adapt',
    './views/completeButtonView'
], function(Backbone, Adapt, CompleteButtonView) {

    var CourseCompleteButtonController = Backbone.View.extend({

        initialize: function() {
            this.listenTo(Adapt, "pageView:ready", this.onPageRender);
            this.listenToOnce(Adapt, "app:dataReady", this.onAppDataReady);
        },

        onPageRender: function() {
            if (this.buttonSettings._isEnabled) {
                $('.navigation-back-button').hide();
                this.completeButtonView = new CompleteButtonView({
                    model: this.buttonSettings
                });
                $(".article-container").append(this.completeButtonView.$el);
            }
        },

        onAppDataReady: function() {
            this.buttonSettings = Adapt.course.get('_settings');
        }

    });

    Adapt.courseCompleteButtonController = new CourseCompleteButtonController();
        
});