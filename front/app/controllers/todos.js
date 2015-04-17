import Ember from 'ember';

export default Ember.ArrayController.extend({
	unArchive: function() {
		return this.filter(function(todo) {
			if(todo.get('isNew')) {
				return false;
			}
			return !todo.get('isArchive');
		});
	}.property('@each.isArchive', '@each.isNew'),

	todo: function() {
		return this.store.createRecord('todo', {
			isDone: false,
			isArchive: false, 
			createdAt: new Date()
		});
	}.property('newCount'),
	// 保证每创建完成一个后, 能够自动生成一个空的 Todo 用于收集前台的数据
	newCount: 0,

	actions: {
		newTodo: function() {
			// 回车
			if(event.keyCode === 13) {
				this.get('todo').save();
				this.incrementProperty('newCount', 1);
			}
		},

		archiveTodos: function() {
			console.log('archiveTodos..!!!..');
			var archivedTodos = this.filter(function(todo) {
				return todo.get('isDone');
			});
			archivedTodos.setEach('isArchive', true);
			archivedTodos.setEach('isDone', true);
		}
	}
});
