import Ember from 'ember';

export default Ember.ArrayController.extend({
  unArchive: function() {
    return this.filter(function(todo) {
      if(todo.get('isNew')) {
        return false;
      }
      return !todo.get('isArchive');
    });
  }.property('@each.isArchive'),

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
    newTodo() {
      // 回车
      if(event.keyCode === 13) {
        var self = this;
        //this.get('todo').save().then(function() {
        //	self.incrementProperty('newCount', 1);
        //}, function(error) {
        //	// 需要对 promise 中的异常部分进行处理.
        //	console.log(error);
        //});
        this.get('todo').save().then(() => {
          self.incrementProperty('newCount', 1);
        }).catch(error => {
          console.log(error);
        });
      }
    },

    archiveTodos() {
      console.log('archiveTodos..!!!..');
      var archivedTodos = this.filter(todo => {
        return todo.get('isDone');
      });
      archivedTodos.setEach('isArchive', true);
      archivedTodos.setEach('isDone', true);
    }
  }
});
