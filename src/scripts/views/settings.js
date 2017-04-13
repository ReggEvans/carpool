import React from 'react'
import Backbone from 'backbone'
import STORE from '../store'
import ACTIONS from '../actions'

import Header from './components/header'
import ResetModal from './components/resetModal'

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
		var date = new Date()
		return (
			<div className='settings-container'>
				<div className='page-header'>
					<h4>Settings</h4>
					<button onClick={ACTIONS.logout} className='change-teacher'><i className="material-icons md-light md-36">highlight_off</i></button>
				</div>
				<div className='post-header'>
					<a href='#dashboard'>
						<div className='home-icon'><i className="material-icons">home</i></div>
					</a>
					<a href='#dashboard'>
						<p>Dashboard</p>
					</a>
					<div className='date'>
						<p>{moment(date).format('MMMM Do YYYY')}</p>
					</div>
				</div>
				<div className='settings-buttons'>
					<Reset students={this.state.studentCollection}/>
					<ResetModal 
						modalState={this.state.showResetModal}
						students={this.state.studentCollection}/>
					<button className='add-button' onClick={this._handleTeacherForm}>
						<div className='teacher-button-settings'>
							<p>Add New Teacher</p>
						</div>
					</button>
					<button className='add-button' onClick={this._handleStudentForm}>
						<div className='student-button-settings'>
							<p>Add New Student</p>
						</div>
					</button>
				</div>
				<div className='settings-form-wrapper'>
					<TeacherForm teacherForm={this.state.showTeacherForm}/>
					<StudentForm studentForm={this.state.showStudentForm}/>
				</div>
			</div>
		)
	}
})

var Reset = React.createClass({
	_handleModal: function() {
		ACTIONS.showResetModal()
	},
	render: function(){
		return (
			<div className='reset-div'>
				<button className='reset-button' onClick={this._handleModal}>Reset Student Stages</button>
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