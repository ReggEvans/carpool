import React from 'react'
import Backbone from 'backbone'
import STORE from '../store'
import ACTIONS from '../actions'

import TeacherModal from './components/teacherModal'

var Class = React.createClass({
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
	render: function() {
		return (
			<div>
				<TeacherModal 
					teachers={this.state.teacherCollection}
					teacherModalState={this.state.showTeacherModal} />
				<h1>MyClass</h1>
				<StudentGroup 
					teacher_id={this.state.teacher_id}
					students={this.state.studentCollection} />
			</div>
		)
	}
})

var StudentGroup = React.createClass({
	_makeStudentList: function(model) {
		if (model.get('teacher_id') === this.props.teacher_id) {
			return (
				<StudentList studentModel={model} key={model.cid} />
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
	render: function() {
		if (this.props.studentModel.get('stage') === 2) {
			return (
				<div>
					<p>{this.props.studentModel.get('firstName')}&nbsp;{this.props.studentModel.get('lastName')}</p>
				</div>
			)
		}
		return null
	}
})



export default Class