/*
 * adapt-proof-of-concept
 * License
 * Maintainers - Siarhei Savitski <siarhei.savitski@instinctools.ru>
 */
define([
  'backbone',
  'coreJS/adapt',
  './views/pageView',
  './helpers/adapt-proof-of-concept-helper',
  './lib/adaptModelExtension',
  './handlers/buttons',
  './handlers/visibility'
], function (Backbone, Adapt, PageView) {

  Adapt.proofOfConcept = _.extend({

    model: null,
    pageView: null,

    initialize: function () {
      this.listenTo(Adapt, {
        "pageView:preRender": this.onPagePreRender
      });
    },

    getModelConfig: function (model) {
      return model.get("_proofOfConcept");
    },

    setModelConfig: function (model, config) {
      return model.set("_proofOfConcept", config);
    },

    onPagePreRender: function (view) {
      this.pageView = new PageView({
        model: view.model,
        el: view.el
      });
    }

  }, Backbone.Events);

  Adapt.proofOfConcept.initialize();

  return Adapt.proofOfConcept;

});