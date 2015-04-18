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
		// 可以将上面的 openEdit, closeEdit 合并, 分成上面两个写法主要是因为在页面刷新后, 点击
		// <span> 里面的 title 开启 isEdit 后, 只要在 Edit 模式中的 input 框中按下一个键就会自动将 isEdit 标记为 false,
		// 这里我没有弄明白是如何变化的? 并且是所有 todo item 的 component 都会被重新绘制一遍.
		// -- 在 archived 页面没有, 只有在 todos 页面一直有这问题.
		toggleEdit: function() {
			console.log('toggleEdit');
			this.toggleProperty('isEdit');
			if(this.get('isEdit')) {
				var self = this;
				Em.run.later(function() {
					self.$('input.focus').focus();
				}, 200);
			}
		},
		removeTodo: function(todo) {
			//todo.deleteRecord();
			todo.destroyRecord();
		},
		undo: function(todo) {
			todo.set('isDone', false).set('isArchive', false);
		}
	}
});
