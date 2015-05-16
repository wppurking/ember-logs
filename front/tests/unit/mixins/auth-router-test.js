import Ember from 'ember';
import AuthRouterMixin from '../../../mixins/auth-router';
import { module, test } from 'qunit';

module('AuthRouterMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var AuthRouterObject = Ember.Object.extend(AuthRouterMixin);
  var subject = AuthRouterObject.create();
  assert.ok(subject);
});
