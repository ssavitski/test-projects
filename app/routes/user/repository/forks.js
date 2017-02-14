import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const repository = this.modelFor('user.repository');
    const url = repository.forks_url;

    return Ember.$.getJSON(url);
  }
});
