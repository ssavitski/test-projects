import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const repository = this.modelFor('user.repository');
    const url = repository.commits_url.replace('{/sha}', '');

    return Ember.$.getJSON(url);
  }
});
