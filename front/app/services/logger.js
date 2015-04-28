import Ember from 'ember';

export default Ember.Service.extend({
  log(msg) {
    console.log(`${new Date().toISOString()}: ${msg}`);
  }
});
