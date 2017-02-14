import Ember from 'ember';

export default Ember.Controller.extend({
  userController: Ember.inject.controller('user'),
  user: Ember.computed.reads('userController.model'),
  forked: Ember.computed.alias('fork'),
});
