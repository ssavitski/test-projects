define([
    'coreJS/adapt',
    '../views/buttonView'
], function(Adapt, ButtonView) {

    var ProofOfConceptButtonHandler = _.extend({

        buttonViews: null,

        counter: 0,

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
                "proof-of-concept:finished": this.onRemove
            });
        },

        onPreRender: function(view) {
            //setup button on prerender to allow it to control the steplocking process
            if (!this.isProofOfConceptEnabled(view.model)) return;

            this.setupConfigDefaults(view.model, this.counter++);

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

        setupConfigDefaults: function(model, counter) {

            var proofOfConcept = Adapt.proofOfConcept.getModelConfig(model);

            if (!counter) {

                if (proofOfConcept._button.prev._style == "disabled") {
                    proofOfConcept._button.prev._isDisabled = true;
                } else {
                    proofOfConcept._button.prev._isVisible = false;
                }

            } else {
                proofOfConcept._button.prev._isVisible = true;
                proofOfConcept._button.prev._isDisabled = false;
            }

            if (model.get("_isProofOfConceptButtonConfigured")) return;

            proofOfConcept._button = _.extend({
                "prev": {
                    "_isEnabled": true,
                    "_style": "disabled",
                    "text": "Prev page",
                    "_isVisible": true,
                    "_isDisabled": false
                },
                "next": {
                    "_styleBeforeCompletion": "disabled",   // default is "disabled" 
                    "text": "Next page",
                    "finalText": "Complete Activity",
                    "_isVisible": true,
                    "_isDisabled": true
                },
                "_component": "navigate-buttons",
                "_isLocking": true
            }, proofOfConcept._button);

            Adapt.proofOfConcept.setModelConfig(model, proofOfConcept);
            model.set("_isProofOfConceptButtonConfigured", true);

        },

        onRemove: function() {
            this.buttonViews = {};
            this.counter = 0;
        }

    }, Backbone.Events);

    ProofOfConceptButtonHandler.initialize();

    return ProofOfConceptButtonHandler;
});
