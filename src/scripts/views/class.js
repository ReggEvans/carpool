import React from 'react'
import Backbone from 'backbone'
import STORE from '../store'
import ACTIONS from '../actions'

import TeacherModal from './components/teacherModal'
import MyClassModal from './components/myClassModal'
import Header from './components/header'

var Class = React.createClass({
	componentWillMount: function() {
		console.log('run')
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
	render: function() {
		return (
			<div>
				<Header />
				<TeacherModal 
					teachers={this.state.teacherCollection}
					teacherModalState={this.state.showTeacherModal} />
				<h1>MyClass</h1>
				<StudentGroup 
					teacher_id={this.state.teacher_id}
					students={this.state.studentCollection}
					activeID={this.state.activeID} />
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
		var stageTwo = {
			backgroundColor: 'lightblue'
		}
		var stageThree = {
			backgroundColor: 'lightgreen'
		}
		var valetPopUp = 'hidden'
		var modalBackground = 'hidden'
		if (this.props.activeID === this.props.studentModel.get('_id')) {
			valetPopUp = 'active'
			modalBackground = 'modalBackground'
		}
		if (this.props.studentModel.get('stage') === 2) {
			return (
				<div>
					<div className={modalBackground}>
						<div className={valetPopUp}>
							<h3>Modal Test</h3>
							<p>{this.props.studentModel.get('firstName')}&nbsp;{this.props.studentModel.get('lastName')}</p>
							<button onClick={this._handleIncreaseStage}>IN TRANSIT</button>
							<button onClick={ACTIONS.unsetActiveID}>CANCEL</button>
						</div>
					</div>
					<div onClick={this._handleClick} className='valet-student-list' style={stageTwo}>
						<p>{this.props.studentModel.get('firstName')}&nbsp;{this.props.studentModel.get('lastName')}</p>
					</div>
				</div>
			)
		}
		if (this.props.studentModel.get('stage') === 3) {
			return (
				<div>
					<div className={modalBackground}>
						<div className={valetPopUp}>
							<h3>Modal Test</h3>
							<p>{this.props.studentModel.get('firstName')}&nbsp;{this.props.studentModel.get('lastName')}</p>
							<button onClick={this._handleIncreaseStage}>IN TRANSIT</button>
							<button onClick={ACTIONS.unsetActiveID}>CANCEL</button>
						</div>
					</div>
					<div onClick={this._handleClick} className='valet-student-list'  style={stageThree}>
						<p>{this.props.studentModel.get('firstName')}&nbsp;{this.props.studentModel.get('lastName')}</p>
					</div>
				</div>
			)
		}
		return null
	}
})



export default Class