define([
    'coreJS/adapt',
    './buttonView'
], function(Adapt, ButtonView) {

    var ProofOfConceptButtonHandler = _.extend({

        buttonViews: null,

        initialize: function() {
            this.listenToOnce(Adapt, {
                "app:dataReady": this.onAppDataReady,
                "remove": this.onRemove
            });
        },

        onAppDataReady: function() {
            this.buttonViews = {};
            this.setupEventListeners();
        },

        setupEventListeners: function() {
            this.listenTo(Adapt, {
                "proof-of-concept:preRender": this.onPreRender,
                "proof-of-concept:postRender": this.onPostRender,
            });
        },

        onPreRender: function(view) {
            //setup button on prerender to allow it to control the steplocking process
            if (!this.isProofOfConceptEnabled(view.model)) return;

            this.setupConfigDefaults(view.model);

            this.buttonViews[view.model.get("_id")] = new ButtonView({
                model: view.model
            });
        },

        onPostRender: function(view) {
            //inject the button at post render
            if (!this.isProofOfConceptEnabled(view.model)) return;

            view.$el.append(this.buttonViews[view.model.get("_id")].$el);
        },

        isProofOfConceptEnabled: function(model) {
            var proofOfConcept = Adapt.proofOfConcept.getModelConfig(model);
            if (!proofOfConcept || !proofOfConcept._isEnabled) return false;

            if (proofOfConcept._onChildren && model.get("_type") === "article") return false;

            return true;
        },

        setupConfigDefaults: function(model) {
            if (model.get("_isProofOfConceptButtonConfigured")) return;

            var proofOfConcept = Adapt.proofOfConcept.getModelConfig(model);
            proofOfConcept._button = _.extend({
                "_isEnabled": true,
                "_styleBeforeCompletion": "hidden",
                "_styleAfterClick": "hidden",
                "ariaLabel": "Go to next page",
                "buttonText": "Next page",
                "_component": "next-page-button",
                "_isLocking": true,
                "_isVisible": false,
                "_isDisabled": false
            }, proofOfConcept._button);

            Adapt.proofOfConcept.setModelConfig(model, proofOfConcept);
            model.set("_isProofOfConceptButtonConfigured", true);

        },

        onRemove: function() {
            this.buttonViews = {};
        }

    }, Backbone.Events);

    ProofOfConceptButtonHandler.initialize();

    return ProofOfConceptButtonHandler;
});
