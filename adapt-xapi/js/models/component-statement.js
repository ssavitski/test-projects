define(function(require) {

  var Adapt = require('coreJS/adapt');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var StatementModel = require('./statement');

  var ComponentStatementModel = StatementModel.extend({

    initialize: function() {
      return StatementModel.prototype.initialize.call(this);
    },

    getStatementObject: function() {
      var statement = StatementModel.prototype.getStatementObject.call(this);

      var verb = this.getVerb();
      var object = this.getObject();
      var context = this.getContext();

      if (
        _.isEmpty(verb) ||
        _.isEmpty(object) ||
        _.isEmpty(context)
      ) {
        return null;
      }

      statement.verb = verb;
      statement.object = object;
      statement.context = context;

      return statement;
    },

    getVerb: function() {
      return StatementModel.prototype.getVerb.call(this);
    },

    getObject: function() {
      return StatementModel.prototype.getObject.call(this);
    },

    getResult: function() {
      return StatementModel.prototype.getResult.call(this);
    },

    getActivityDefinitionObject: function() {
      var object = StatementModel.prototype.getActivityDefinitionObject.call(this);
      var aLetterCode = 97;
      var correctResponses = [];
      var componentId = this.get('model').get('_id');
      var componentItems = this.get('model').get('_items');

      if (_.isEmpty(object)) {
        object = {};
      }

      object.name = {};
      object.description = {};
      object.choices = [];

      object.name[Adapt.config.get('_defaultLanguage')] = this.get('model').get('title');
      object.description[Adapt.config.get('_defaultLanguage')] = this.get('model').get('body');

      switch(this.get('model').get('_component')) {
        case 'mcq':
          object.interactionType = 'choice';
          _.each(componentItems, function(item, index) {
            var choice = {};
            choice.description = {};
            choice.description[Adapt.config.get('_defaultLanguage')] = item.text;
            choice.id = componentId + '_' + String.fromCharCode(aLetterCode + index);
            object.choices.push(choice);
            if (item._shouldBeSelected) {
              correctResponses.push(choice.id);
            }
          });
          object.correctResponsesPattern = correctResponses.join('[,]');

          break;
      }

      object.type = ['http://adaptlearning.org', this.get('model').get('_type'), this.get('model').get('_component')].join('/');

      return object;
    },

    getResultOptions: function() {
      var result = {};
      var aLetterCode = 97;
      var correctResponses = [];
      var responses = [];
      var choicesIds = [];
      var items = this.get('model').get('_items');
      var selectedItems = this.get('model').get('_selectedItems');
      var componentId = this.get('model').get('_id');

      result.success = true;

      switch(this.get('model').get('_component')) {
        case 'mcq':
          _.each(items, function(item, index) {
            var choiceId = componentId + '_' + String.fromCharCode(aLetterCode + index);
            choicesIds[item._index] = choiceId;
            if (item._shouldBeSelected) {
              correctResponses.push(choiceId);
            }
          });
          _.each(selectedItems, function(item, index, choices) {

            responses.push(choicesIds[item._index]);
            if ((item._isSelected !== item._shouldBeSelected) || (correctResponses.length !== choices.length)) {
              result.success = false;
            }
          });
          result.response = responses.join(',');
          break;
      }

      return result;
    },

    getIri: function() {
      if (
        _.isEmpty(this.get('activityId')) ||
        _.isEmpty(this.get('model')) ||
        _.isEmpty(this.get('model').get('_type')) ||
        _.isEmpty(this.get('model').get('_id'))
      ) {
        return null;
      }

      return [this.get('activityId'), this.get('model').get('_type'), this.get('model').get('_id')].join('/');
    },

    getContext: function() {
      return StatementModel.prototype.getContext.call(this);
    },

    getContextActivities: function() {
      var contextActivities = StatementModel.prototype.getContextActivities.call(this);

      if (_.isEmpty(contextActivities)) {
        contextActivities = {};
      }

      if (this.get('model').get('_isPartOfAssessment') == true) {
        // component -> block -> article
        var article = this.get('model').getParent().getParent();

        if (!_.isEmpty(article)) {
          var assessmentIri = [this.get('activityId'), 'assessment', article.get('_id')].join('/');
          contextActivities.parent = {
            id : assessmentIri
          }
        }
      }

      return contextActivities;
    },

  });

  return ComponentStatementModel;

});
