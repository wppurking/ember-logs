import Ember from 'ember';
import Auth from '../../mixins/auth';

export default Ember.Controller.extend(Auth, {
  email: "",
  password: '',
  errors: null,

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
