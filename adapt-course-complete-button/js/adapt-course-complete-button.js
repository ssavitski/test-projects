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
                $(".block").last().append(this.completeButtonView.$el);
            }
        },

        onGetLastBlock: function(view) {
            console.log("Check this", Adapt, view);
        },

        onAppDataReady: function() {
            this.buttonSettings = Adapt.course.get('_settings');
        }

    });

    Adapt.courseCompleteButtonController = new CourseCompleteButtonController();
        
});