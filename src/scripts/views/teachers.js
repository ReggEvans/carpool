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
		return (
			<div className='dashboard-container'>
				<h1>Teachers</h1>
				<AllTeachers 
					teachers={this.state.teacherCollection} />
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
			<div>
				<p>{this.props.teacherModel.get('lastName')},&nbsp;{this.props.teacherModel.get('firstName')}</p>
			</div>
		)
	}
})

export default Teachers