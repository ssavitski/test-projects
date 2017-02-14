import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    const user = this.modelFor('user');
    const url = `https://api.github.com/repos/${user.login}/${params.reponame}`;

    return Ember.$.getJSON(url);
  }
});
