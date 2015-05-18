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
        .done(() => {
          this.set('errors', null);
          this.transitionTo('todos');
        }).fail((xhr) => {
          this.set('errors', xhr.responseText);
        });
    },

    logout() {
      console.log('11111111111111');
    }
  }
});
