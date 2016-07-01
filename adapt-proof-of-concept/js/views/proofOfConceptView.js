define([
  'coreJS/adapt'
], function (Adapt) {

  var ProofOfConceptView = Backbone.View.extend({

    isSteplocked: false,

    initialize: function (options) {
      this.setupEventListeners();
    },

    setupEventListeners: function () {
      var AdaptEvents = {
        "proof-of-concept:kill": this.onKill,
        "remove": this.onRemove
      };

      this.onPreRender(this);

      AdaptEvents[this.model.get("_type") + "View:postRender"] = this.onPostRender;
      this.listenTo(Adapt, AdaptEvents);

      this.on("steplock", this.onStepLock);
      this.on("stepunlock", this.onStepUnlock);
    },

    onPreRender: function (view) {
      if (!this.isElementEnabled()) return;

      Adapt.trigger("proof-of-concept:preRender", this);
    },

    onPostRender: function (view) {
      if (view.model.get("_id") !== this.model.get("_id")) return;
      if (!this.isElementEnabled()) return;

      Adapt.trigger("proof-of-concept:postRender", this);
    },

    isElementEnabled: function () {
      var proofOfConcept = Adapt.proofOfConcept.getModelConfig(this.model);
      if (!proofOfConcept) return false;

      var isArticleWithOnChildren = (this.model.get("_type") === "article" && proofOfConcept._onChildren);
      if (isArticleWithOnChildren) {
        return false;
      }

      if (proofOfConcept._isEnabled === true) return true;
      return false;
    },

    onStepLock: function () {
      if (!this.isElementEnabled()) {
        this.continueToNext();
        return;
      }

      Adapt.trigger("proof-of-concept:steplock", this);

      this.isSteplocked = true;
    },

    continueToNext: function () {
      _.defer(_.bind(function () {
        Adapt.trigger("proof-of-concept:continue", this);
      }, this));
    },

    onStepUnlock: function () {
      if (!this.isSteplocked) return;
      this.isSteplocked = false;
      Adapt.trigger("proof-of-concept:stepunlock", this);
    }

  });

  return ProofOfConceptView;

});
