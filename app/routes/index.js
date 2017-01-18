import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return [
      { login: "robconery", name: "Rob Conery" },
      { login: "shanselman", name: "Scott Hanselman" },
      { login: "ssavitski", name: "Siarhei Savitski" },
      { login: "tomdale", name: "Tom Dale" },
      { login: "wycats", name: "Yehuda Katz" },
      { login: "jongalloway", name: "Jon Galloway" },
      { login: "haacked", name: "Phil Haack" }
    ];
  }
});
