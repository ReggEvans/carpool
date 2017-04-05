import Backbone from 'backbone'

export var Teacher = Backbone.Model.extend({
	urlRoot: '/api/teacher',
	idAttribute: '_id'
})

export var TeacherCollection = Backbone.Collection.extend({
	model: Teacher,
	url: '/api/teacher'
})