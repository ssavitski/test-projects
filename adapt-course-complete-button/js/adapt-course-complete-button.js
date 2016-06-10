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
        },

        onPageRender: function() {
            console.log('Article with questions rendered');
            var completeButtonView = new CompleteButtonView();
            $("#wrapper").append(completeButtonView.$el);
        }

    });

    Adapt.courseCompleteButtonController = new CourseCompleteButtonController();
        
});