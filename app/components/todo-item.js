import Ember from 'ember';

export default Ember.Component.extend({
	classNameBindings: ['todo.isDone'],
	isEdit: false,
	actions: {
		exitEditWithEnter: function() {
			console.log(event.keyCode);
			if(event.keyCode === 13) {
				console.log("in Enter");
				this.set('isEdit', false);
			}
		},
		openEdit: function() {
			console.log('Open Edit');
			this.set('isEdit', true);
		},
		closeEdit: function() {
			console.log('Close Edit');
			this.set('isEdit', false);
		},
		toggleEdit: function() {
			console.log('toggleEdit');
			this.toggleProperty('isEdit');
		},
		removeTodo: function(todo) {
			todo.deleteRecord();
		}
	}
});
