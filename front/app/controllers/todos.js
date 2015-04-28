import Ember from 'ember';
import Todo from '../models/todo';

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
        }).catch(() => {
          console.log(self.get('todo.errors.messages'));
        });
      }
    },

    archiveTodos() {
      this.logger.log('archiveTodos..!!!..');
      // 这里更新了, 但如果不进行 save 的话, 这些 Model 仍然会被加载出来进行批量更新
      var archivedTodos = this.filter(todo => {
        return todo.get('isDone');
      });
      /* 每一个 mode 都进行一次独立的保存(批量 Archive) 的方式, 这样 model 信息会一致.
      archivedTodos.forEach((todo) => {
        todo.set('isArchive', true);
        todo.save().catch((error) => {
          todo.rollback();
          console.log(error);
        });
      });
      */

      // Model 通过 Ember.$.ajax 的处理方式, 一次性批量处理.
      Todo.archives(archivedTodos);
    },

    closeAlert() {
      this.get('todo.errors').clear();
    }
  }
});
