import React from 'react'
import Backbone from 'backbone'
import STORE from '../store'
import ACTIONS from '../actions'

var Settings = React.createClass({
	getInitialState: function() {
		return {
			showTeacherForm: false,
			showStudentForm: false
		}
	},
	_handleTeacherForm: function(){
		this.setState({
			showTeacherForm: this.state.showTeacherForm ? false : true,
			showStudentForm: this.state.showStudentForm = false
		})
	},
	_handleStudentForm: function(){
		this.setState({
			showStudentForm: this.state.showStudentForm ? false : true,
			showTeacherForm: this.state.showTeacherForm = false
		})
	},
	render: function() {
		return (
			<div className='dashboard-container'>
				<h1>Settings</h1>
				<div className='dash-buttons'>
					<button onClick={this._handleTeacherForm}>
						<div className='teacher-button'>
							<p>Add New Teacher</p>
						</div>
					</button>
					<button onClick={this._handleStudentForm}>
						<div className='student-button'>
							<p>Add New Student</p>
						</div>
					</button>
					<TeacherForm teacherForm={this.state.showTeacherForm}/>
					<StudentForm studentForm={this.state.showStudentForm}/>
				</div>
			</div>
		)
	}
})

var TeacherForm = React.createClass({
	_handleTeacherSubmit: function(event) {
		event.preventDefault()
		var formInput = event.target
		var teacherData = {
			firstName: formInput.studentFirstName.value,
			lastName: formInput.studentLastName.value
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
					<p>First Name</p>
					<input name='studentFirstName' type='text' />
					<p>Last Name</p>
					<input name='studentLastName' type='text' /> <br /> <br />
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
			firstName: formInput.firstName.value,
			lastName: formInput.lastName.value
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