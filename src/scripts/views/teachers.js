import React from 'react'
import Backbone from 'backbone'
import STORE from '../store'
import ACTIONS from '../actions'

var Teachers = React.createClass({
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
			<div className='all-teacher-container'>
				<div className='page-header'>
					<h4>Teachers</h4>
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
				<div className='all-teacher-wrapper'>
					<AllTeachers 
						teachers={this.state.teacherCollection} />
				</div>
			</div>
		)
	}
})

var AllTeachers = React.createClass({
	_makeTeacherList: function(model) {
			return (
				<TeacherList teacherModel={model} key={model.cid} />
			)
	},
	render: function() {
		return (
			<div>
				{this.props.teachers.map(this._makeTeacherList)}
			</div>
		)
	}
})

var TeacherList = React.createClass({
	render: function() {
		return (
			<div className='all-teacher-list'>
				<p>{this.props.teacherModel.get('lastName')},&nbsp;{this.props.teacherModel.get('firstName')}</p>
			</div>
		)
	}
})

export default Teachers