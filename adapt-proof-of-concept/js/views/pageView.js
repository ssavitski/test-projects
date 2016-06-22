define([
    'coreJS/adapt',
    './proofOfConceptView'
], function(Adapt, ProofOfConceptView) {

    var PageView = Backbone.View.extend({

    	currentDescendant: null,
    	descendantsChildFirst: null,
        descendantsParentFirst: null,
        descendantViews: null,

        initialize: function(options) {
            this.setupDescendants();
            this.addClassToHtml();
            this.setupEventListeners();
        },

        setupDescendants: function() {
            this.currentDescendant = null;
            this.descendantViews = {};
            this.getDescendants();
        },

        getDescendants: function() {
            this.descendantsChildFirst = this.model.getDescendants();
            this.descendantsParentFirst = this.model.getDescendants(true);

            this.setDescendantsProofOfConceptDefaults();

            this.descendantsChildFirst = this.filterComponents(this.descendantsChildFirst);
            this.descendantsParentFirst = this.filterComponents(this.descendantsParentFirst);

        },

        filterComponents: function(descendants) {
            return new Backbone.Collection(descendants.filter(function(descendant) {
                if (descendant.get("_type") === "component") return false;
                if (!descendant.get("_isAvailable")) return false;
                return true;
            }));
        },

        setDescendantsProofOfConceptDefaults: function() {
            //use parent first as likely to get to article 
            //
            this.descendantsParentFirst.each(_.bind(function(descendant) {

                var proofOfConcept = Adapt.proofOfConcept.getModelConfig(descendant);
                var noProofOfConceptConfig = (!proofOfConcept);

                //check if descendant has proofOfConcept settings
                if (noProofOfConceptConfig) return;

                //setup steplocking defaults
                proofOfConcept._stepLocking = _.extend({
                    "_isEnabled": true,
                    "_isCompletionRequired": true
                }, proofOfConcept._stepLocking);

                //setup main proofOfConcept defaults
                proofOfConcept = _.extend({
                    "_isEnabled": true,
                    "_onChildren": true
                }, proofOfConcept);

                Adapt.proofOfConcept.setModelConfig(descendant, proofOfConcept);

                //check article "onChildren" rule
                if (proofOfConcept._onChildren 
                    && descendant.get("_type") === "article") {
                    this.setupArticleOnChildren(descendant, proofOfConcept);
                }

            }, this));
        },

        setupArticleOnChildren: function(articleModel, articleProofOfConceptConfig) {
            //set proofOfConcept on all blocks, using article config with block overrides
            var articleBlocks = articleModel.getChildren();

            articleBlocks.each(function(blockModel, index) {
                var blockProofOfConceptConfig = Adapt.proofOfConcept.getModelConfig(blockModel);

                for (var k in blockProofOfConceptConfig) {
                    if (typeof blockProofOfConceptConfig[k] === "object") {
                        blockProofOfConceptConfig[k] = _.extend({}, articleProofOfConceptConfig[k], blockProofOfConceptConfig[k]);
                    }
                }

                blockProofOfConceptConfig = _.extend({}, articleProofOfConceptConfig, blockProofOfConceptConfig);

                if (articleBlocks.length === index+1) {
                    blockProofOfConceptConfig._isFinal = true;
                }

                Adapt.proofOfConcept.setModelConfig(blockModel, blockProofOfConceptConfig);
            });

        },

        addClassToHtml: function() {
            $("html").addClass("proof-of-concept");
        },

        onPageReady: function(model, value) {
            if (!value) return;

            this.currentDescendant = null;

            Adapt.trigger("proof-of-concept:started");
            this.gotoNextDescendant();
        },

        gotoNextDescendant: function() {
            this.getDescendants();

            if (this.currentDescendant) {
                this.currentDescendant.trigger("stepunlock");
                this.currentDescendant = null;
            }

            for (var index = this.currentDescendantIndex || 0, l = this.descendantsChildFirst.models.length; index < l; index++) {
                var descendant = this.descendantsChildFirst.models[index];
                switch ( descendant.get("_type") ) {
                case "block": case "article":
                    this.currentLocksOnDescendant = 0;
                    this.currentDescendantIndex = index;
                    var currentId = descendant.get("_id");
                    this.currentDescendant = this.descendantViews[currentId];
                    this.currentDescendant.trigger("steplock");
                    return;
                }
            }
            this.finished();
        },

        gotoPrevDescendant: function() {
        	this.getDescendants();

            if (this.currentDescendant) {
                this.currentDescendant.trigger("stepunlock");
                this.currentDescendant = null;
            }

            for (var index = this.currentDescendantIndex || 0, l = (this.descendantsChildFirst.models.length-1); index < l; index++) {
                var descendant = this.descendantsChildFirst.models[index];
                switch ( descendant.get("_type") ) {
                case "block": case "article":
                    this.currentLocksOnDescendant = 0;
                    this.currentDescendantIndex = index;
                    var currentId = descendant.get("_id");
                    this.currentDescendant = this.descendantViews[currentId];
                    this.currentDescendant.trigger("steplock");
                    return;
                }
            }
            this.finished();
        },

        setupEventListeners: function() {
            this.listenTo(Adapt, {
                "remove": this.onRemove,
                "proof-of-concept:goNext": this.goNext,
                "proof-of-concept:goPrev": this.goPrev,
                "proof-of-concept:continue": this.onContinue,
                "articleView:preRender": this.onDescendantPreRender,
                "blockView:preRender": this.onDescendantPreRender
            });
            this.listenToOnce(this.model, "change:_isReady", this.onPageReady)
        },

        onDescendantPreRender: function(view) {
            //ignore components
            if (view.model.get("_type") === "component") return;

            var descendantView = new ProofOfConceptView({
                model: view.model,
                el: view.el
            });
            this.descendantViews[view.model.get("_id")] = descendantView;
        },

        goNext: function() {
        	this.currentDescendant.trigger("steplock");
        	this.currentLocksOnDescendant--;
            if (this.currentLocksOnDescendant > 0) return;
            
            this.currentDescendantIndex++;
            this.gotoNextDescendant();
        },

        onContinue: function() {
            console.log("Continue...");
        },

        goPrev: function() {
        	this.currentDescendant.trigger("steplock");
        	this.currentDescendantIndex--;
        	this.gotoPrevDescendant();
        },

        finished: function() {
            Adapt.trigger("proof-of-concept:finished");
            this.detachFromPage();
        },

        onRemove: function() {
            this.finished();
        },

        detachFromPage: function() {
            this.removeClassFromHtml();
            this.undelegateEvents();
            this.stopListening();
            this.model = null;
            this.$el = null;
            this.el = null;
            this.currentDescendant = null;
            this.descendantViews = null;
            this.descendantsChildFirst = null;
            this.descendantsParentFirst = null;
            Adapt.proofOfConcept.pageView = null;
        },

        removeClassFromHtml: function() {
            $("html").removeClass("proof-of-concept");
        }
                
    });	

    return PageView;

})
