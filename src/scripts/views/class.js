import React from 'react'
import Backbone from 'backbone'
import STORE from '../store'
import ACTIONS from '../actions'

import TeacherModal from './components/teacherModal'
import MyClassModal from './components/myClassModal'
import Header from './components/header'

// checking branch 

var Class = React.createClass({
	componentWillMount: function() {
		ACTIONS.fetchAllData()
		ACTIONS.fetchTeacherData()
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
	render: function() {
		var date = new Date()
		var teacherCollection = this.state.teacherCollection
		var teacher_id = this.state.teacher_id
		return (
			<div className='class-container'>
				<div className='page-header'>
					<h4>MyClass</h4>
					<button onClick={ACTIONS.changeTeacher} className='change-teacher'><i className="material-icons md-light md-36">account_box</i></button>
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
				<TeacherModal 
					teachers={this.state.teacherCollection}
					modalState={this.state.showModal}
					teacherSearchCollection={this.state.searchTeachers} />
				<div className='class-student-group'>
					<p className='teacher-name'>{ACTIONS.getTeacherName(teacherCollection, teacher_id)}</p>
					<StudentGroup 
						teacher_id={this.state.teacher_id}
						students={this.state.studentCollection}
						activeID={this.state.activeID} />
				</div>
			</div>
		)
	}
})

var StudentGroup = React.createClass({
	_makeStudentList: function(model) {
		if (model.get('teacher_id') === this.props.teacher_id) {
			return (
				<StudentList 
					studentModel={model} 
					activeID={this.props.activeID}
					key={model.cid} />
			)
		}
	},
	render: function() {
		return (
			<div>
				{this.props.students.map(this._makeStudentList)}
			</div>
		)
	}
})

var StudentList = React.createClass({
	_handleClick: function() {
		ACTIONS.setActiveID(this.props.studentModel.get('_id'))
	},
	_handleIncreaseStage: function() {
		  ACTIONS.increaseStage(this.props.studentModel)
		  ACTIONS.unsetActiveID()
	},
	render: function() {
		var valetPopUp = 'hidden'
		var modalBackground = 'hidden'
		if (this.props.activeID === this.props.studentModel.get('_id')) {
			valetPopUp = 'active'
			modalBackground = 'modalBackground'
		}
		if (this.props.studentModel.get('stage') === 1) {
			return (
				<div className='class-list'>
					<div className={modalBackground}>
						<div className={valetPopUp}>
							<h5>{this.props.studentModel.get('firstName')}&nbsp;{this.props.studentModel.get('lastName')}</h5>
							<button id='cancel' onClick={ACTIONS.unsetActiveID}>CANCEL</button>
						</div>
					</div>
					<div onClick={this._handleClick} className='class-student-list' id='stage-one'>
						<p>{this.props.studentModel.get('firstName')}&nbsp;{this.props.studentModel.get('lastName')}</p>
					</div>
				</div>
			)
		}
		if (this.props.studentModel.get('stage') === 2) {
			return (
				<div className='class-list'>
					<div className={modalBackground}>
						<div className={valetPopUp}>
							<h5>{this.props.studentModel.get('firstName')}&nbsp;{this.props.studentModel.get('lastName')}</h5>
							<button onClick={this._handleIncreaseStage}>ON THE WAY!</button>
							<button id='cancel' onClick={ACTIONS.unsetActiveID}>CANCEL</button>
						</div>
					</div>
					<div onClick={this._handleClick} className='class-student-list' id='stage-two'>
						<div className='class-status-arrival'></div>
						<p>{this.props.studentModel.get('firstName')}&nbsp;{this.props.studentModel.get('lastName')}</p>
						<p id='class-small-arrival'>Your ride is here!</p>
					</div>
				</div>
			)
		}
		if (this.props.studentModel.get('stage') === 3) {
			return (
				<div className='class-list'>
					<div className={modalBackground}>
						<div className={valetPopUp}>
							<h5>{this.props.studentModel.get('firstName')}&nbsp;{this.props.studentModel.get('lastName')}</h5>
							<button id='cancel' onClick={ACTIONS.unsetActiveID}>CANCEL</button>
						</div>
					</div>
					<div onClick={this._handleClick} className='class-student-list' id='stage-three'>
						<p>{this.props.studentModel.get('firstName')}&nbsp;{this.props.studentModel.get('lastName')}</p>
						<p id='class-small-transit'>On the way!</p>
					</div>
				</div>
			)
		}
		if (this.props.studentModel.get('stage') === 4) {
			return (
				<div className='class-list'>
					<div className={modalBackground}>
						<div className={valetPopUp}>
							<h5>{this.props.studentModel.get('firstName')}&nbsp;{this.props.studentModel.get('lastName')}</h5>
							<button id='cancel' onClick={ACTIONS.unsetActiveID}>CANCEL</button>
						</div>
					</div>
					<div onClick={this._handleClick} className='class-student-list' id='stage-four'>
						<p>{this.props.studentModel.get('firstName')}&nbsp;{this.props.studentModel.get('lastName')}</p>
					</div>
				</div>
			)
		}
	}
})



export default Class