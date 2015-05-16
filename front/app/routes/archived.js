import Ember from 'ember';
import AuthRouter from '../mixins/auth-router';

export default Ember.Route.extend(AuthRouter, {
	model() {
		//return this.store.filter('todo', function(todo) {
			//console.log(todo.get('isArchive'));
			//return todo.get('isArchive');
		//});

		// filter 仅仅是 Store 的方法, 是用于在 Store 这个 Center Reponsitry 中寻找需要的数据用的.
		// 而 Route 的主要职责是相仿设法通过 JSON-API 或者外部其他地方获取到合适的数据.
		// 例如数据的分页, 查询, 搜索都应该在 Route 中处理.
		return this.store.findAll('todo');
		// 可以先让 Store findAll 一下, 然后再进行 filter 给下层使用
		//return this.store.filter('todo', function(todo) {
			//return todo.get('isArchive');
		//});
	}
});
