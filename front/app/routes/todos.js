import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return this.store.findAll('todo');
	},

	actions: {
		error: function(error, tran) {
			console.log("In Todos Route..");
		}
	}
});
