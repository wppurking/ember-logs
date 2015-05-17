import Ember from 'ember';

export default Ember.Mixin.create({
  error: function() {
    return this.session.get('error');
  }.property('session.error'),

  isAuthenticate: function() {
    console.log('isAuthenticate in auth mixin');
    return this.session.isAuthenticate();
  }.property('session.token'),

  // 登陆用户的名字
  currentUsername: function() {
    return this.session.get('email');
  }.property('session.email')
});
