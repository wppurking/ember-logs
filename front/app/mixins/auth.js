import Ember from 'ember';

export default Ember.Mixin.create({
  isAuthenticate: function() {
    var flag = this.session.isAuthenticate();
    console.log(this.session + ":::" + flag);
    return flag;
  }.property('session.token'),

  // 登陆用户的名字
  currentUsername: function() {
    console.log(this.session.get('email'));
    return this.session.get('email');
  }.property()
});
