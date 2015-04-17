import Ember from 'ember';

export default Ember.ArrayController.extend({
	archived: function() {
		return this.store.filter('todo', function(todo) {
			return todo.get('isArchive');
		});
	}.property()
});
