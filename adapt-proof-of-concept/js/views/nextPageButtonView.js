define([
    'backbone',
    'coreJS/adapt',
    'handlebars'
], function(Backbone, Adapt, Handlebars) {

    var NextPageButtonView = Backbone.View.extend({

        initialize: function() {
            this.render();  
        },

        events: {
            "click .next-page": "goNextPage"
        },

        setCourseCompleteAndReturn: function() {
        	
            
        },

        goNextPage: function() {
            this.$el.hide();
        },

        render: function() {
            var template = Handlebars.templates['nextPageButton'];
            this.$el.html(template(this.model));
            return this;
        }

    });

    return NextPageButtonView;
        
});