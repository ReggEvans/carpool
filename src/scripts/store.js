import Backbone from 'backbone'
import {TeacherCollection} from './models/teacherModel'
import {StudentCollection} from './models/studentModel'
import {PickupCollection} from './models/pickupModel'

var STORE = Object.assign({}, Backbone.Events, {
	data: {
		teacherCollection: new TeacherCollection(),
		searchTeachers: new TeacherCollection(),
		studentCollection: new StudentCollection(),
		searchStudents: new StudentCollection(),
		pickupCollection: new PickupCollection(),
		showLogin: true,
		showRegister: false,
		showModal: true,
		showProfileModal: false,
		showDriverModal: false,
		showResetModal: false,
		showTeacherForm: false,
		showStudentForm: false,
		activeID: '',
		teacher_id: '',
		student_id: '',
		studentModel: {},
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