import DS from 'ember-data';

var Todo = DS.Model.extend({
	// 是否完成
	isDone: DS.attr('boolean'),
	// 是否存档
	isArchive: DS.attr('boolean'),
	title: DS.attr('string'),
	createdAt: DS.attr('date'),
	scope: DS.belongsTo('scope')
});

Todo.reopenClass({
	FIXTURES: [
		{id: 1, isDone: false, isArchive: false, title: 'First Todo to do.', createdAt: new Date('2015-04-11')},
		{id: 2, isDone: false, isArchive: false, title: '2 Todo to do.', createdAt: new Date('2015-04-12')},
		{id: 3, isDone: false, isArchive: false, title: '3 Todo to do.', createdAt: new Date('2015-04-13')},
		{id: 4, isDone: false, isArchive: false, title: '4 Todo to do.', createdAt: new Date('2015-04-14')},
		{id: 5, isDone: false, isArchive: false, title: '5 Todo to do.', createdAt: new Date('2015-04-15')}
	]
});

export default Todo;