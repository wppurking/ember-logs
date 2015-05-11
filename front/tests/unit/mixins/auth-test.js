import Ember from 'ember';
import AuthMixin from '../../../mixins/auth';
import { module, test } from 'qunit';

module('AuthMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var AuthObject = Ember.Object.extend(AuthMixin);
  var subject = AuthObject.create();
  assert.ok(subject);
});
