import React from 'react'
import Backbone from 'backbone'
import STORE from '../store'
import ACTIONS from '../actions'

import Header from './components/header'

var Settings = React.createClass({
	componentWillMount: function() {
		ACTIONS.fetchAllData()
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},
	getInitialState: function() {
		return STORE.data
	},
	componentWillUnmount: function() {
		STORE.off()
	},
	_handleTeacherForm: function(){
		ACTIONS.showTeacherForm()
	},
	_handleStudentForm: function(){
		ACTIONS.showStudentForm()
	},
	render: function() {
		return (
			<div className='dashboard-container'>
				<Header />
				<h1>Settings</h1>
				<div className='settings-buttons'>
					<button onClick={this._handleTeacherForm}>
						<div className='teacher-button-settings'>
							<p>Add New Teacher</p>
						</div>
					</button>
					<button onClick={this._handleStudentForm}>
						<div className='student-button-settings'>
							<p>Add New Student</p>
						</div>
					</button>
					<Reset students={this.state.studentCollection}/>
					<TeacherForm teacherForm={this.state.showTeacherForm}/>
					<StudentForm studentForm={this.state.showStudentForm}/>
				</div>
			</div>
		)
	}
})

var Reset = React.createClass({
	_handleReset: function() {
		ACTIONS.resetStudentsStage(this.props.students)
	},
	render: function(){
		return (
			<div>
				<button onClick={this._handleReset}>Reset Student Stages</button>
			</div>
		)
	}
})

var TeacherForm = React.createClass({
	_handleTeacherSubmit: function(event) {
		event.preventDefault()
		var formInput = event.target
		var teacherData = {
			prefix: formInput.prefix.value.toLowerCase(),
			firstName: formInput.teacherFirstName.value.toLowerCase(),
			lastName: formInput.teacherLastName.value.toLowerCase()
		}
		ACTIONS.addTeacher(teacherData)
		formInput.reset()
	},
	render: function(){
		if(this.props.teacherForm === true) {
		return (
			<div>
				<h3>New Teacher Form</h3>
				<form onSubmit={this._handleTeacherSubmit}>
					<p>Prefix</p>
					<select name="prefix" >
						<option></option>
		 				<option value="Mr.">Mr.</option>
		 				<option value="Ms.">Ms.</option>
		 			</select>
					<p>First Name</p>
					<input name='teacherFirstName' type='text'/>
					<p>Last Name</p>
					<input name='teacherLastName' type='text' /> <br /> <br />
					<input type='submit' value='submit' />
				</form>
			</div>
		)
		} else {
			return null
		}
	}
})

var StudentForm = React.createClass({
	_handleStudentSubmit: function(event) {
		event.preventDefault()
		var formInput = event.target
		var studentData = {
			firstName: formInput.firstName.value.toLowerCase(),
			lastName: formInput.lastName.value.toLowerCase(),
			authDrivers: formInput.authDrivers.value
		}
		ACTIONS.addStudent(studentData)

		formInput.reset()
	},
	render: function(){
		if(this.props.studentForm === true) {
		return (
			<div>
				<h3>New Student Form</h3>
				<form onSubmit={this._handleStudentSubmit}>
					<p>First Name</p>
					<input name='firstName' type='text' />
					<p>Last Name</p>
					<input name='lastName' type='text' />
					<p>Authorized Drivers</p>
					<input name='authDrivers' type='text' />
					<p>Teacher</p>
					<select name='teacher'>
					  <option></option>
					</select> <br /> <br />
					<input type='submit' value='submit' />
				</form>
			</div>
		)
		} else {
			return null
		}
	}
})

export default Settings