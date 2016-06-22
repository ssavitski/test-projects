define([
  'coreJS/adapt',
  'coreViews/componentView',
  'handlebars'
], function (Adapt, ComponentView, Handlebars) {

  var completionAttribute = "_isInteractionComplete";

  var ButtonsView = Backbone.View.extend({

    isStepLocking: false,
    hasStepLocked: false,
    isStepLocked: false,
    isStepLockFinished: false,
    hasStepPreCompleted: false,
    allowEnabled: true,

    el: function () {
      this.setupPreRender();

      return Handlebars.templates['navigate-buttons'](this.model.toJSON());
    },

    setupPreRender: function () {
      this.setupButtonVisible();
      this.setupButtonEnabled();
    },

    setupButtonVisible: function () {
      var interactionComplete = this.model.get(completionAttribute);
      var proofOfConcept = Adapt.proofOfConcept.getModelConfig(this.model);

      if (proofOfConcept._button.next._styleBeforeCompletion === "hidden") {
        proofOfConcept._button.next._isVisible = (interactionComplete) ? true : false;
      } else {
        proofOfConcept._button.next._isVisible = true;
      }
    },

    setupButtonEnabled: function () {
      var proofOfConcept = Adapt.proofOfConcept.getModelConfig(this.model);
      var interactionComplete = this.model.get(completionAttribute);

      if (proofOfConcept._stepLocking._isCompletionRequired === false) {
        this.allowEnabled = true;
        proofOfConcept._button.next._isDisabled = false;
      } else if (proofOfConcept._button.next._styleBeforeCompletion === "disabled") {
        this.allowEnabled = false;
        proofOfConcept._button.next._isDisabled = (interactionComplete) ? false : true;
      } else {
        proofOfConcept._button.next._isDisabled = false;
        this.allowEnabled = true;
      }
    },

    events: {
      "click .button-next": "onNextButtonClick",
      "click .button-prev": "onPrevButtonClick",
      "click .button-complete": "onCompleteButtonClick"
    },

    initialize: function (options) {
      this.getCompletionAttribute();
      this.setupStepLocking();
      this.setupEventListeners();
    },

    getCompletionAttribute: function () {
      var proofOfConcept = Adapt.proofOfConcept.getModelConfig(Adapt.config);

      if (!proofOfConcept) return;
      if (proofOfConcept._completionAttribute) {
        completionAttribute = proofOfConcept._completionAttribute
      }
    },

    setupStepLocking: function () {
      var proofOfConcept = Adapt.proofOfConcept.getModelConfig(this.model);

      if (proofOfConcept._stepLocking._isEnabled) {
        this.isStepLocked = true;
      } else {
        this.isStepLocked = false;
      }
    },

    setupEventListeners: function () {
      this.listenTo(Adapt, {
        "proof-of-concept:steplock": this.onStepLock,
        "proof-of-concept:stepunlock": this.onStepUnlock,
        "proof-of-concept:skip": this.onSkip,
        "proof-of-concept:kill": this.onKill,
        "proof-of-concept:update": this.onUpdate,
        "remove": this.onRemove
      });

      this.listenTo(this.model, "change:" + completionAttribute, this.onCompletion);
    },


    setButtonVisible: function (bool) {
      var proofOfConcept = Adapt.proofOfConcept.getModelConfig(this.model);

      if (!bool) {
        this.$(".button-next").addClass("display-none");
        proofOfConcept._button.next._isVisible = false;
      } else {
        this.$(".button-next").removeClass("display-none");
        proofOfConcept._button.next._isVisible = true;
      }
    },

    checkButtonEnabled: function () {
      if (!this.allowEnabled) {
        this.setButtonEnabled(false);
      } else {
        this.setButtonEnabled(true);
      }
    },

    setButtonEnabled: function (bool) {
      var proofOfConcept = Adapt.proofOfConcept.getModelConfig(this.model);

      if (bool) {
        this.$(".button-next, .button-complete").removeClass("disabled").removeAttr("disabled");
        proofOfConcept._button.next._isDisabled = true;
      } else {
        this.$(".button-next, .button-complete").addClass("disabled").attr("disabled", "disabled");
        proofOfConcept._button.next._isDisabled = false;
      }
    },

    onStepLock: function (view) {
      if (!this.isViewMatch(view)) return;

      this.hasStepLocked = true;
      this.isStepLocking = true;

      if (this.isButtonEnabled()) {
        var isCompleteAndShouldRelock = (this.model.get(completionAttribute));

        if (isCompleteAndShouldRelock) {
          this.isStepLocked = true;
          this.setButtonVisible(true);
        } else if (this.hasStepPreCompleted) {
          //force the button to show if section completed before it was steplocked
          this.isStepLocked = true;
          this.stepCompleted();
        }
      }
    },

    isViewMatch: function (view) {
      return view.model.get("_id") === this.model.get("_id");
    },

    isButtonEnabled: function () {
      var proofOfConcept = Adapt.proofOfConcept.getModelConfig(this.model);

      if (!proofOfConcept._isEnabled) return false;
      return true;
    },

    onCompletion: function (model, value) {
      if (value === false) return;

      this.hasStepPreCompleted = true;

      if (!this.hasStepLocked) return;

      _.defer(_.bind(function () {
        this.stepCompleted();
      }, this));
    },

    stepCompleted: function () {
      if (this.isStepLockFinished) return;

      this.isStepLocked = false;
      this.allowEnabled = false;

      if (this.isButtonEnabled()) {
        if (this.isStepLocking) {
          this.isStepLocked = true;
        } else {
          this.isStepLockFinished = true;
        }

        this.allowEnabled = true;
      }

      this.checkButtonEnabled();
      this.setButtonVisible(true);
    },

    onNextButtonClick: function () {
      this.isStepLocked = false;
      this.isStepLockFinished = true;
      Adapt.trigger("proof-of-concept:goNext");
    },

    onPrevButtonClick: function () {
      this.isStepLocked = false;
      this.isStepLockFinished = true;
      Adapt.trigger("proof-of-concept:goPrev");
    },

    onCompleteButtonClick: function () {
      // Adapt.trigger('navigation:backButton');
      window.top.postMessage('exit', '*');
    },

    onUpdate: function () {
      this.setButtonVisible(true);

      var $original = this.$el;
      var $newEl = $(Handlebars.templates['navigate-buttons'](this.model.toJSON()));
      $original.replaceWith($newEl);

      this.setElement($newEl);
    },

    onStepUnlock: function (view) {
      if (!this.isViewMatch(view)) return;
      this.isStepLocking = false;
    },

    onSkip: function () {
      if (!this.isStepLocking) return;
      this.onKill();
    },

    onKill: function () {
      this.isStepLocked = false;
      this.isStepLocking = false;
      this.allowEnabled = false;
      this.isStepLockFinished = true;
      this.checkButtonEnabled();
    },

    onRemove: function () {
      this.isStepLocking = true;
      this.remove();
    }

  });

  return ButtonsView;
});
