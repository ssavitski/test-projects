define([
  'coreJS/adapt',
], function (Adapt) {

  var ProofOfConceptVisibilityHandler = _.extend({

    isStepLocking: false,

    proofOfConceptModel: null,

    initialize: function () {
      this.listenToOnce(Adapt, "app:dataReady", this.onAppDataReady);
    },

    onAppDataReady: function () {
      this.setupEventListeners();
    },

    setupEventListeners: function () {
      this.listenTo(Adapt, {
        "proof-of-concept:steplock": this.onStepLock,
        "proof-of-concept:visibility": this.onVisibility,
        "proof-of-concept:stepunlock": this.onStepUnlock,
        "proof-of-concept:kill": this.onKill,
        "proof-of-concept:finished": this.onFinished,
        "remove": this.onRemove
      });

    },

    onStepLock: function (view) {
      this.isStepLocking = true;
      this.proofOfConceptModel = view.model;
      Adapt.trigger("proof-of-concept:visibility");
    },

    onVisibility: function () {
      if (!this.isStepLocking) return;
      if (!Adapt.proofOfConcept.pageView) return;

      var descendantsParentFirst = Adapt.proofOfConcept.pageView.descendantsParentFirst;
      var proofOfConceptModelId = this.proofOfConceptModel.get("_id");
      var proofOfConceptType = this.proofOfConceptModel.get("_type");

      var articleId;
      var atIndex = _.findIndex(descendantsParentFirst.models, function (descendant) {
        if (descendant.get("_id") === proofOfConceptModelId) {
          articleId = descendant.get("_parentId");
          return true;
        }
      });

      descendantsParentFirst.each(function (descendant, index) {
        if ((index == atIndex) || (descendant.get("_id") == articleId)) {
          descendant.set("_isVisible", true, {pluginName: "proof-of-concept"});
          var components = descendant.findDescendants("components");

          components.each(function (componentModel) {
            componentModel.set("_isVisible", true, {pluginName: "proof-of-concept"});
          });
        } else {

          if (proofOfConceptType === "article" && descendant.get("_type") === "block") {
            //make sure article blocks are shown
            if (descendant.get("_parentId") === proofOfConceptModelId) {
              descendant.set("_isVisible", true, {pluginName: "proof-of-concept"});
              var components = descendant.findDescendants("components");

              components.each(function (componentModel) {
                componentModel.set("_isVisible", true, {pluginName: "proof-of-concept"});
              });
              return;
            }
          }

          descendant.set("_isVisible", false, {pluginName: "proof-of-concept"});
          var components = descendant.findDescendants("components");

          components.each(function (componentModel) {
            componentModel.set("_isVisible", false, {pluginName: "proof-of-concept"});
          });
        }
      });

    },

    onStepUnlock: function (view) {
      this.isStepLocking = false;
      this.proofOfConceptModel = null;
    },

    onKill: function () {
      this.onFinished();
      this.onStepUnlock();
    },

    onFinished: function () {
      var descendantsParentFirst = Adapt.proofOfConcept.pageView.descendantsParentFirst;

      descendantsParentFirst.each(function (descendant) {
        descendant.set("_isVisible", true, {pluginName: "proof-of-concept"});
        var components = descendant.findDescendants("components");
        components.each(function (componentModel) {
          componentModel.set("_isVisible", true, {pluginName: "proof-of-concept"});
        });
      });

    },

    onRemove: function () {
      this.onStepUnlock();
    }

  }, Backbone.Events);

  ProofOfConceptVisibilityHandler.initialize();

  return ProofOfConceptVisibilityHandler;

});
