import Backbone from 'backbone'
import {TeacherCollection} from './models/teacherModel'
import {StudentCollection} from './models/studentModel'

var STORE = Object.assign({}, Backbone.Events, {
	data: {
		teacherCollection: new TeacherCollection(),
		studentCollection: new StudentCollection(),
		showLogin: true,
		showRegister: false,
		showTeacherModal: true,
		activeID: '',
		teacher_id: ''
	},

	get: function(prop) {
		return this.data[prop]
	},

	set: function(attrs) {
		this.data = Object.assign(this.data, attrs)
		this.trigger('dataUpdated')
	}
})

export default STORE