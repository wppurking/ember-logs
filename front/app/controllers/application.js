import Ember from 'ember';
import Auth from '../mixins/auth';

export default Ember.Controller.extend(Auth, {

  actions: {
    changeToken() {
      this.session.set('token', '123123123');
      console.log(this.session.get('token'));
    },

    logout() {
      console.log('logout');
      this.session.signout();
    }
  }
});
