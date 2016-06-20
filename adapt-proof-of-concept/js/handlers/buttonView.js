define([
    'coreJS/adapt',
    'coreViews/componentView',
    'handlebars'
], function(Adapt, ComponentView, Handlebars) {

    var completionAttribute = "_isInteractionComplete";

    var NextButtonView = Backbone.View.extend({

        isStepLocking: false,
        hasStepLocked: false,
        isStepLocked: false,
        isStepLockFinished: false,
        hasStepPreCompleted: false,
        isWaitingForClick: false,
        allowVisible: false,
        allowEnabled: true,
        overlayShownCount: 0,

        el: function() {

            this.setupPreRender();

            return Handlebars.templates['next-page-button'](this.model.toJSON());
        },

        setupPreRender: function() {
            
            this.setupButtonVisible();
            this.setupButtonEnabled();
        },

        setupButtonVisible: function() {
            var proofOfConcept = Adapt.proofOfConcept.getModelConfig(this.model);
            this.allowVisible = false;
            proofOfConcept._button._isVisible = false;

            if (proofOfConcept._button._styleBeforeCompletion === "visible") {
                this.allowVisible = true;
            }
        },

        setupButtonEnabled: function() {
            var proofOfConcept = Adapt.proofOfConcept.getModelConfig(this.model);
            
            if (proofOfConcept._stepLocking._isCompletionRequired === false) {
                this.allowEnabled = true;
                proofOfConcept._button._isDisabled = false;   
            } else if (proofOfConcept._button._styleBeforeCompletion === "visible") {
                this.allowEnabled = false;
                proofOfConcept._button._isDisabled = true;
            } else {
                proofOfConcept._button._isDisabled = false;
                this.allowEnabled = true;
            }

        },
        
        events: {
            "click .button-next": "onNextButtonClick",
            "click .button-prev": "onPrevButtonClick"
        },

        initialize: function(options) {
            this.getCompletionAttribute();
            this.setupStepLocking();
            this.setupEventListeners();
        },

        getCompletionAttribute: function() {
            var proofOfConcept = Adapt.proofOfConcept.getModelConfig(Adapt.config);
            if (!proofOfConcept) return;
            if (proofOfConcept._completionAttribute) {
                completionAttribute = proofOfConcept._completionAttribute
            }
        },

        setupStepLocking: function() {
            var proofOfConcept = Adapt.proofOfConcept.getModelConfig(this.model);
            if (proofOfConcept._stepLocking._isEnabled) {
                this.isStepLocked = true;
            } else {
                this.isStepLocked = false;
            }
        },

        setupEventListeners: function() {
            this.listenTo(Adapt, {
                "proof-of-concept:steplock": this.onStepLock,
                "proof-of-concept:stepunlock": this.onStepUnlock,
                "proof-of-concept:skip": this.onSkip,
                "proof-of-concept:kill": this.onKill,
                "proof-of-concept:update": this.onUpdate,
                "remove": this.onRemove 
            });

            this.listenTo(this.model, "change:"+completionAttribute, this.onCompletion);
        },


        setButtonVisible: function(bool) {
            var proofOfConcept = Adapt.proofOfConcept.getModelConfig(this.model);
            if (!bool) {
                this.$(".button-next").addClass("display-none");
                proofOfConcept._button._isVisible = false;
                //console.log("trickle hiding button", this.model.get("_id"));
            } else {
                this.$(".button-next").removeClass("display-none");
                proofOfConcept._button._isVisible = true;
                //console.log("trickle showing button", this.model.get("_id"));
            }
        },

        checkButtonEnabled: function(bool) {
            if (!this.allowEnabled) {
                this.setButtonEnabled(false);
            } else {
                this.setButtonEnabled(true);
            }
        },

        setButtonEnabled: function(bool) {
            var proofOfConcept = Adapt.proofOfConcept.getModelConfig(this.model);
            if (bool) {
                this.$("button").removeClass("disabled").removeAttr("disabled");
                proofOfConcept._button._isDisabled = true;
            } else {
                this.$("button").addClass("disabled").attr("disabled", "disabled");
                proofOfConcept._button._isDisabled = false;
            }
        },

        onStepLock: function(view) {
            if (!this.isViewMatch(view)) return;

            this.hasStepLocked = true;
            this.isStepLocking = true;

            var proofOfConcept = Adapt.proofOfConcept.getModelConfig(this.model);

            if (this.isButtonEnabled()) {
                var isCompleteAndShouldRelock = (this.model.get(completionAttribute));

                if (isCompleteAndShouldRelock) {
                    this.isStepLocked = true;
                    this.allowVisible = true;
                    this.setButtonVisible(true);
                } else if (this.hasStepPreCompleted) {
                    //force the button to show if section completed before it was steplocked
                    this.isStepLocked = true;
                    this.allowVisible = true;
                    this.stepCompleted();
                }
            }
        },

        isViewMatch: function(view) {
            return view.model.get("_id") === this.model.get("_id");
        },

        isButtonEnabled: function() {
            var proofOfConcept = Adapt.proofOfConcept.getModelConfig(this.model);

            if (!proofOfConcept._isEnabled || !proofOfConcept._button._isEnabled) return false;
            return true;
        },

        onCompletion: function(model, value) {
            if (value === false) return;

            this.hasStepPreCompleted = true;

            if (!this.hasStepLocked) return;

            _.defer(_.bind(function() {
                this.stepCompleted();
            }, this));
        },

        stepCompleted: function() {

            if (this.isStepLockFinished) return;

            this.isStepLocked = false;
            this.allowVisible = false;
            this.allowEnabled = false;

            if (this.isButtonEnabled()) {
                if (this.isStepLocking) {

                    this.isStepLocked = true;

                } else {

                    this.isStepLockFinished = true;
                }

                this.allowVisible = true;
                this.allowEnabled = true;
            }

            this.checkButtonEnabled();
            this.setButtonVisible(true);

        },

        onNextButtonClick: function() {
            this.isStepLocked = false;
            this.isStepLockFinished = true;
            Adapt.trigger("proof-of-concept:goNext");
            var proofOfConcept = this.model.get("_proofOfConcept");
            switch (proofOfConcept._button._styleAfterClick) {
            case "hidden":
                this.allowVisible = false;
                this.setButtonVisible(false);
                break;
            case "disabled":
                this.allowEnabled = false;
                this.setButtonVisible(true);
            }
        },

        onPrevButtonClick: function() {
            this.isStepLocked = false;
            this.isStepLockFinished = true;
            Adapt.trigger("proof-of-concept:goPrev");
            var proofOfConcept = this.model.get("_proofOfConcept");
            switch (proofOfConcept._button._styleAfterClick) {
            case "hidden":
                this.allowVisible = false;
                this.setButtonVisible(false);
                break;
            case "disabled":
                this.allowEnabled = false;
                this.setButtonVisible(true);
            }
        },

        onUpdate: function() {
            var proofOfConcept = Adapt.proofOfConcept.getModelConfig(this.model);
            this.setButtonVisible(true);
            
            var $original = this.$el;
            var $newEl = $(Handlebars.templates['next-page-button'](this.model.toJSON()));
            $original.replaceWith($newEl);

            this.setElement($newEl);

        },

        onStepUnlock: function(view) {
            if (!this.isViewMatch(view)) return;
            this.isStepLocking = false;
        },

        onSkip: function() {
            if (!this.isStepLocking) return;

            this.onKill();
        },

        onKill: function() {
            this.isStepLocked = false;
            this.isStepLocking = false;
            this.allowVisible = false;
            this.allowEnabled = false;
            this.isStepLockFinished = true;
            this.checkButtonEnabled();
        },

        onRemove: function() {
            this.isStepLocking = true;
            this.remove();
        }

    });

    return NextButtonView;
});
