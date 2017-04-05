import Backbone from 'backbone'

export var Student = Backbone.Model.extend({
	urlRoot: '/api/student',
	idAttribute: '_id'
})

export var StudentCollection = Backbone.Collection.extend({
	model: Student,
	url: '/api/student'
})