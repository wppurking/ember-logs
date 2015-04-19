import Ember from 'ember';

export default Ember.ArrayController.extend({
  // 这种语法现在还无法使用到 es6 中的 function 简写, 因为需要这种语法的时候, 其需要的是 property 不是 function
	archived: function() {
		return this.store.filter('todo', function(todo) {
			return todo.get('isArchive');
		});
	}.property()
});
