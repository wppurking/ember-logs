import Ember from 'ember';

export default Ember.Mixin.create({
  beforeModel: function() {
    if(this.session.isAuthenticate()) {
      console.log('success authenticate');
    } else {
      // 不能在 Router 中设置字段, 需要在 Controller 中设置字段.
      // TODO: Ember 2.0(1.13) 中会变化
      this.session.set('error', 'Please login');
      this.transitionTo('session.new');
    }
  }
});
