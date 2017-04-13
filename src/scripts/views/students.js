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
		var date = new Date()
		return (
			<div className='all-student-container'>
				<div className='page-header'>
					<h4>Students</h4>
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
				<div className='all-student-wrapper'>
					<AllStudents students={this.state.studentCollection} />
				</div>
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
			<div className='all-student-overflow'>
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