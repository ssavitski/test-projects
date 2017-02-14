import Ember from 'ember';

const Issue = Ember.Object.extend({
  title: '',
  body: '',
  isValid() {

  }
});

export default Ember.Controller.extend({
  repoController: Ember.inject.controller('user.repository'),
  repo: Ember.computed.reads('repoController.model'),
  issue: function() {
    return Issue.create();
  }.property('repo'),
  actions: {
    submitIssue() {
      const { title, body } = this.get('issue');
      const url = this.getProperties('repo').repo.issues_url.replace('{/number}', '');
/*
      Ember.$.post(url, { title, body }, (result) => {
        //success...
        this.transitionToRoute('user.repository.issues');
        alert('New issue have been added!');
      });
*/
      console.log('POST request to ', url);
      console.log('Params are: \"' + title + '\", \"' + body + '\"');
      this.set('issue', Issue.create());
      this.transitionToRoute('user.repository.issues');
    }
  }
});
