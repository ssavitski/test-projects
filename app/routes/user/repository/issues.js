import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const repository = this.modelFor('user.repository');
    const url = repository.issues_url.replace('{/number}', '');

    return Ember.$.getJSON(url);
  }
});
