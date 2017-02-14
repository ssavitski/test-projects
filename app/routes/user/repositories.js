import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const user = this.modelFor('user');

    return Ember.$.getJSON(user.repos_url);
  }
});
