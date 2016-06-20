/*
* adapt-course-complete-button
* License
* Maintainers - Siarhei Savitski <siarhei.savitski@instinctools.ru>
*/
define([
    'backbone',
    'coreJS/adapt',
    './views/nextPageButtonView',
    './views/pageView',
    './lib/adaptModelExtension',
    './handlers/button',
    './handlers/visibility'
], function(Backbone, Adapt, NextPageButtonView, PageView) {

    Adapt.proofOfConcept = _.extend({

        model: null,
        pageView: null,

        initialize: function() {
            this.listenTo(Adapt, {
                "pageView:preRender": this.onPagePreRender
            });
        },

        getModelConfig: function(model) {
            return model.get("_proofOfConcept");
        },

        setModelConfig: function(model, config) {
            return model.set("_proofOfConcept", config);
        },

        onPagePreRender: function(view) {
            this.pageView = new PageView({
                model: view.model, 
                el: view.el
            });
        }

    }, Backbone.Events);

    Adapt.proofOfConcept.initialize();

    return Adapt.proofOfConcept;
        
});