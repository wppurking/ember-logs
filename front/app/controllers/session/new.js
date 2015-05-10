import Ember from 'ember';

export default Ember.Controller.extend({
  email: "",
  password: '',
  errors: null,

  isAuthenticate: function() {
    console.log(this.session);
    return this.session.isAuthenticate();
  }.property('session.token'),

  actions: {
    login() {
      this.set('errors', null);
      this.session.signin(this.get('email'), this.get('password'))
        .done((r) => {
          console.log("Token: " + this.session.get('token') + ";" + JSON.stringify(r));
        }).fail((xhr) => {
          this.set('errors', xhr.responseText);
        });
    }
  }
});
