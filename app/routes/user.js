import Ember from 'ember';

export default Ember.Route.extend({
  model({ login }) {
    return Ember.$.getJSON(`https://api.github.com/users/${login}`);
  }
});
