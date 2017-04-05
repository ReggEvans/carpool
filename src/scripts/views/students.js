import React from 'react'
import Backbone from 'backbone'
import STORE from '../store'
import ACTIONS from '../actions'

var Students = React.createClass({
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
			<div className='dashboard-container'>
				<h1>Students</h1>
				<AllStudents students={this.state.studentCollection} />
			</div>
		)
	}
})

var AllStudents = React.createClass({
	_makeStudentList: function(model) {
			return (
				<StudentList studentModel={model} key={model.cid} />
			)
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
		return (
			<div>
				<p>{this.props.studentModel.get('lastName')},&nbsp;{this.props.studentModel.get('firstName')}</p>
			</div>
		)
	}
})

export default Students