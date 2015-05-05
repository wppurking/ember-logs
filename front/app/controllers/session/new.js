import Ember from 'ember';

export default Ember.Controller.extend({
  email: "",
  password: '',
  errors: null,

  actions: {
    login() {
      this.set('errors', null);
      Ember.$.ajax('/session', {
        type: 'POST',
        data: {
          email: this.get('email'),
          password: this.get('password')
        },
        dataType: 'json'
      }).done((r) => {
        console.log(r);
      }).fail((xhr) => {
        this.set('errors', xhr.responseText);
      });
    }
  }
});
