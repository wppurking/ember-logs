import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
// 无法使用 arrays 写法
//export default Router.map(() => {
  this.route('todos');
  this.route('archived');
  this.route('session', function() {
    this.route('new');
    this.route('logout');
  });
});
