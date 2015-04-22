import Ember from 'ember';

// 在页面上测试后, 发现 Component 如果频繁计算, 其实还是会有一些慢的,
// 例如: 当我添加到 50 个左右的 Todo 后(用 Component 来组成的) 接下来每一次的 Todo 变化都引起
// each 内所有的 Component 重新绘制.
// 问题:
// 1. 为什么每一个独立的 Component 自己的 Edit 变化会让整个 {{#each}} 中的 Component 重新绘制? 不应该只绘制自己吗?
// 2. Compoennt 绘制速度真的很慢吗? 是因为量多导致的吗? 在 50 个量级会有明显感觉.
export default Ember.Component.extend({
  classNameBindings: ['todo.isDone'],
  isEdit: false,
  actions: {
    exitEditWithEnter() {
      console.log(event.keyCode);
      if(event.keyCode === 13) {
        console.log("in Enter");
        this.set('isEdit', false);
        this.get('todo').save().then(() => {
          console.log("Save Success");
        }).catch(error => {
          console.log(error);
        });
      }
    },
    // 可以将上面的 openEdit, closeEdit 合并, 分成上面两个写法主要是因为在页面刷新后, 点击
    // <span> 里面的 title 开启 isEdit 后, 只要在 Edit 模式中的 input 框中按下一个键就会自动将 isEdit 标记为 false,
    // 这里我没有弄明白是如何变化的? 并且是所有 todo item 的 component 都会被重新绘制一遍.
    // -- 在 archived 页面没有, 只有在 todos 页面一直有这问题.
    // - 解决问题, 为 controller:todos 中关于 unArchive 这个 property 的监控计算问题导致, 取消了 @each.isNew
    toggleEdit(todo) {
      console.log('toggleEdit');
      this.toggleProperty('isEdit');
      if(this.get('isEdit')) {
        var self = this;
        // Em 是 Ember 库中的简写
        //Em.run.later(function() {
        Ember.run.later(() => {
          if(todo.get('isDrity')) {
            todo.save().catch((error) => {
              console.log(error);
            });
          }
          self.$('input.focus').focus();
        }, 200);
      }
    },
    removeTodo(todo) {
      //todo.deleteRecord();
      if(confirm('确认删除?')) {
        todo.destroyRecord().catch(error => {
          console.log("Fail destory one record" + error);
        });
      }
    },
    undo(todo) {
      todo.set('isDone', false).set('isArchive', false).save().catch((error) => {
        todo.rollback();
        console.log(error);
      });
    }
  }
});
