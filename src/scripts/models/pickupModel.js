import Backbone from 'backbone'

export var Pickup = Backbone.Model.extend({
	urlRoot: '/api/pickup',
	idAttribute: '_id'
})

export var PickupCollection = Backbone.Collection.extend({
	model: Pickup,
	url: '/api/pickup'
})