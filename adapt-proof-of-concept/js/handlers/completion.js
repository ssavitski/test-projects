define([
    'coreJS/adapt', 
], function(Adapt) {

    var completionAttribute = "_isInteractionComplete";

    var ProofOfConceptCompletionHandler = _.extend({

        isStepLocking: false,
        isCompleted: false,
        
        stepModel: null,
        
        initialize: function() {
            this.listenToOnce(Adapt, "app:dataReady", this.onAppDataReady);
        },

        onAppDataReady: function() {
            this.getCompletionAttribute();
            this.setupEventListeners();
        },

        getCompletionAttribute: function() {
            var proofOfConcept = Adapt.proofOfConcept.getModelConfig(Adapt.config);
            if (!proofOfConcept) return;
            if (proofOfConcept._completionAttribute) {
                completionAttribute = proofOfConcept._completionAttribute
            }
        },

        setupEventListeners: function() {
            this.listenTo(Adapt, {
                "proof-of-concept:descendants": this.onDescendants,
                "proof-of-concept:steplock": this.onStepLock,
                "proof-of-concept:stepunlock": this.onStepUnlock,
                "proof-of-concept:kill": this.onKill,
                "remove": this.onRemove
            });
        },

        onDescendants: function(view) {
            //save the original completion state of the component before steplocking
            view.descendantsParentFirst.each(_.bind(function(descendant) {
                var proofOfConcept = Adapt.proofOfConcept.getModelConfig(descendant);
                if (!proofOfConcept) return;
                proofOfConcept._wasCompletedPreRender = descendant.get(completionAttribute);
            }, this));
        },

        onStepLock: function(view) {
            var isModelComplete = view.model.get(completionAttribute);

            var proofOfConcept = Adapt.proofOfConcept.getModelConfig(view.model);
            if (!proofOfConcept._stepLocking._isCompletionRequired
                && !proofOfConcept._stepLocking._isLockedOnRevisit) {
                if (isModelComplete) {
                    //skip any components that do not require completion but that are already complete
                    //this is needed for a second visit to a page with 'inview' components that aren't reset and don't require completion and are not relocked on revisit
                    Adapt.trigger("proof-of-concept:continue", view);
                }
                return;
            }

            if (proofOfConcept._stepLocking._isCompletionRequired
                && isModelComplete
                && proofOfConcept._wasCompletedPreRender) {
                //skip any components that are complete, have require completion and we completed before the page rendered
                Adapt.trigger("proof-of-concept:continue", view);
                return;
            }

            if (isModelComplete) {
                _.defer(function() {
                    Adapt.trigger("proof-of-concept:unwait")
                });
                return;
            }

            view.model.set("_isproofOfConceptAutoScrollComplete", false);
            this.isCompleted = false;
            this.isStepLocking = true;
            this.stepModel = view.model;

            this.listenTo(this.stepModel, "change:"+completionAttribute, this.onCompletion);
        },

        onCompletion: function(model, value) {
            if (value === false) return;

            _.defer(_.bind(function() {
                this.stepCompleted();
            }, this));

        },

        stepCompleted: function() {

            if (!this.isStepLocking) return;

            if (this.isCompleted) return;
            this.isCompleted = true;

            this.stopListening(this.stepModel, "change:"+completionAttribute, this.onCompletion);
            
            _.defer(function(){
                Adapt.trigger("proof-of-concept:unwait");
            });
        },

        onKill: function() {
            this.onStepUnlock();
        },

        onRemove: function() {
            this.onStepUnlock();
        },

        onStepUnlock: function() {
            this.stopListening(this.stepModel, "change:"+completionAttribute, this.onCompletion);
            this.isStepLocking = false;
            this.stepModel = null;
            this.isCompleted = false;
        }        

    }, Backbone.Events);

    ProofOfConceptCompletionHandler.initialize();

    return ProofOfConceptCompletionHandler;

});
