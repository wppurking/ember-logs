import DS from 'ember-data';

var Todo = DS.Model.extend({
  // 是否完成
  isDone: DS.attr('boolean'),
  // 是否存档
  isArchive: DS.attr('boolean'),
  title: DS.attr('string'),
  createdAt: DS.attr('date')
});


// !! reopenClass 与 reopen 的区别, 在学习 Ruby 中的 class_eval, instance_eval
Todo.reopenClass({
  FIXTURES: [
    {id: 1, isDone: false, isArchive: false, title: 'First Todo to do.', createdAt: new Date('2015-04-11')},
    {id: 2, isDone: false, isArchive: false, title: '2 Todo to do.', createdAt: new Date('2015-04-12')},
    {id: 3, isDone: false, isArchive: false, title: '3 Todo to do.', createdAt: new Date('2015-04-13')},
    {id: 4, isDone: false, isArchive: false, title: '4 Todo to do.', createdAt: new Date('2015-04-14')},
    {id: 5, isDone: false, isArchive: false, title: '5 Todo to do.', createdAt: new Date('2015-04-15')},
    {id: 6, isDone: true, isArchive: true, title: '6 Todo to do.', createdAt: new Date('2015-04-16')},
    {id: 7, isDone: true, isArchive: true, title: '7 Todo to do.', createdAt: new Date('2015-04-17')},
    {id: 8, isDone: true, isArchive: true, title: '8 Todo to do.', createdAt: new Date('2015-04-18')}
  ],

  /**
   * 批量存档 Todo
   */
  archives(todos) {
    var ids = todos.mapBy('id');
    todos.setEach('isArchive', true);
    Ember.$.ajax('/todos/archives', {
      dataType: 'json',
      type: 'put',
      data: {ids: ids}
    }).then(() => {
      console.log("Success");
    }).fail((error) => {
      todos.forEach((todo) => {
        todo.rollback();
      });
      console.log(error);
    })
  }
});

export default Todo;
