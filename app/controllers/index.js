import Ember from 'ember';

export default Ember.Controller.extend({
  renderedOn: function() {
    return new Date();
  }.property(),

  actions: {
    clickMe() {
      alert('Work!');
    }
  }
});
