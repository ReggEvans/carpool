import STORE from './store'
import Backbone from 'backbone'
import {Teacher} from './models/teacherModel'
import {Student} from './models/studentModel'
import {Pickup} from './models/pickupModel'
import User from './models/userModel'

var ACTIONS = {
	addTeacher: function(teacherData) {
		var newTeacher = new Teacher(teacherData)
		newTeacher.save()
			.then(
				function(response) {
					console.log('Saved!')
					ACTIONS.fetchAllData()
				},
				function(err) {
					console.log(err)
				}
			)
	},
	addStudent: function(studentData) {
		var newStudent = new Student(studentData)
		newStudent.save()
			.then(
				function(response) {
					console.log('Saved!')
					ACTIONS.fetchAllData()
				},
				function(err) {
					console.log(err)
				}
			)
	},
	fetchAllData: function() {
		var teacherColl = STORE.get('teacherCollection')
		var studentColl = STORE.get('studentCollection')
		var pickupColl = STORE.get('pickupCollection')
		teacherColl.fetch()
		studentColl.fetch()
		pickupColl.fetch()
			.then(function(){
				STORE.set({
					teacherCollection: teacherColl,
					studentCollection: studentColl,
					pickupCollection: pickupColl
				})
			})
	},
	fetchStudentData: function() {
		var search = STORE.get('searchStudents')
		search.fetch()
			.then(function(){
				STORE.set({
					searchStudents: search
				})
			})
	},
	fetchTeacherData: function() {
		var search = STORE.get('searchTeachers')
		search.fetch()
			.then(function(){
				STORE.set({
					searchTeachers: search
				})
			})
	},
	autoSearch: function(partial) {
		var search = STORE.get('searchStudents')
		search.fetch({
			data: {
				lastName: `/^${partial}/`
			}
		})
			.then(function(resp) {
				console.log(resp)
				STORE.set({
					searchStudents: search
				})	
			})
	},
	autoSearchTeacher: function(partial) {
		var search = STORE.get('searchTeachers')
		search.fetch({
			data: {
				lastName: `/^${partial}/`
			}
		})
			.then(function(resp) {
				console.log(resp)
				STORE.set({
					searchTeachers: search
				})	
			})
	},
	registerUser: function(userData) {
		User.register(userData)
			.done(
				function(response) {
					console.log(`New user ${response.firstName} registered!`)
					console.log(response)
					ACTIONS.loginUser(userData.email, userData.password)
				}
			)
			.fail(
				function(error) {
					alert('Problem registering user!')
					console.log(error)
				}
			)
	},
	loginUser: function(email,password) {
		User.login(email,password)
			.done(
				function(response) {
					console.log(`${response.firstName} logged in!`)
					console.log(response)
					location.hash = 'dashboard'
				}
			)
			.fail(
				function(error) {
					alert('Problem logging in!')
					console.log(error)
				}
			)
	},
	logout: function(){
		User.logout()
		.done(
			function(response){
				console.log('Logged out')
				location.hash = 'login'
			}
		)
		.fail(
			function(err){
				console.log('Problem logging out')
				console.log(err)
			}
		)
	},
	setActiveID : function(studentID) {
		STORE.set({
			activeID : studentID
		})
	},
	unsetActiveID: function() {
		STORE.set({
			activeID: null
		})
	},
	saveZone: function(zoneNum, model) {
		model.set({
			zone: zoneNum
		})
		model.save()
			.done(function(response) {
			})
			.fail(function(error) {
				alert('couldn\'t change the zone')
				console.log(error)
			})
	},
	saveDriver: function(driver, model) {
		model.set({
			currentDriver: driver
		})
		model.save()
			.done(function(response) {
			})
			.fail(function(error) {
				alert('couldn\'t change the driver')
				console.log(error)
			})
	},
	savePickup: function(pickupData) {
		var newPickup = new Pickup(pickupData)
		newPickup.save()
			.then(
				function(response) {
					console.log('Saved!')
				},
				function(err) {
					console.log(err)
				}
			)
	},
	increaseStage: function(model) {
		model.set({
			stage: model.get('stage') + 1
		})
		model.save()
			.done(function(response) {
				ACTIONS.fetchAllData()
				ACTIONS.cancelDriverModal()
			})
			.fail(function(error) {
				alert('couldn\'t change the stage')
				console.log(error)
			})
	},
	removeStage: function(model) {
		model.set({
			stage: 4
		})
		model.save()
			.done(function(response) {
				ACTIONS.fetchAllData()
				ACTIONS.cancelDriverModal()
			})
			.fail(function(error) {
				alert('couldn\'t change the stage')
				console.log(error)
			})
	},
	resetStudentsStage: function(collection) {
		collection.forEach(function(model){
			model.set({
				stage: 1,
				zone: 1,
				currentDriver: ''
			})
			model.save()
				.done(function(response) {
					console.log('saved!')
					ACTIONS.fetchAllData()
				})
				.fail(function(error) {
					alert('couldn\'t change the stage')
					console.log(error)
			})
		})
	},
	storeDriver: function(driver) {
		STORE.set({
			storeDriver: driver
		})
	},
	showTeacherForm: function() {
		STORE.set({
			showTeacherForm: true,
			showStudentForm: false
		})
	},
	showStudentForm: function() {
		STORE.set({
			showTeacherForm: false,
			showStudentForm: true
		})
	},
	getTeacherID: function(id) {
		STORE.set({
			showModal: false,
			teacher_id: id
		})
		ACTIONS.fetchTeacherData()
	},
	changeTeacher: function() {
		STORE.set({
			showModal: true
		})
	},
	showModal: function() {
		STORE.set({
			showModal: true,
		})
	},
	cancelModal: function() {
		STORE.set({
			showModal: false,
		})
	},
	showProfileModal: function(model) {
		STORE.set({
			showProfileModal: true,
			studentModel: model,
			activeID: ''
		})
	},
	cancelProfileModal: function() {
		STORE.set({
			showProfileModal: false,
		})
	},
	showDriverModal: function(model) {
		STORE.set({
			showDriverModal: true,
			studentModel: model,
			activeID: ''
		})
	},
	cancelDriverModal: function() {
		STORE.set({
			showDriverModal: false,
		})
	},
	showResetModal: function() {
		STORE.set({
			showResetModal: true,
		})
	},
	cancelResetModal: function() {
		STORE.set({
			showResetModal: false,
		})
	},
	getTeacherName: function(teacherColl, teacher_id) {
		var teachers = teacherColl.models
		for(var i = 0; i < teachers.length; i++) {
			if (teachers[i].get('_id') === teacher_id) {
				return `${teachers[i].get('firstName')} ${teachers[i].get('lastName')}'s Classroom`
			}
		}
	},
	loginName: function(){
		if (User.getCurrentUser() === null){
			return 'Welcome!'
		}
		else if (User.getCurrentUser().get('firstName') === undefined) {
			return 'Welcome!'
		}
		return `Welcome ${User.getCurrentUser().get('firstName')}!`
	},
}

// setInterval(ACTIONS.fetchAllData, 1000)

export default ACTIONS

