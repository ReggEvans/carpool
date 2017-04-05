import React from 'react'
import Backbone from 'backbone'
import STORE from '../../store'
import ACTIONS from '../../actions'

var TeacherModal = React.createClass({
	render: function(){
		var valetPopUp = 'active'
		var modalBackground = 'modalBackground'
		if (this.props.teacherModalState) {
			return(
				<div className={modalBackground}>
					<div className={valetPopUp}>
						<h3>Modal Teacher Test</h3>
						<TeacherGroup teachers={this.props.teachers} />
						
					</div>
				</div>
			)
		}
		return null
	}
})

var TeacherGroup = React.createClass({
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
	_handleTeacherID: function() {
		ACTIONS.getTeacherID(this.props.teacherModel.get('_id'))
	},
	render: function() {
		return (
			<div>
				<button onClick={this._handleTeacherID}>
					{this.props.teacherModel.get('firstName')}&nbsp;{this.props.teacherModel.get('lastName')}
				</button>
			</div>
		)
	}
})

export default TeacherModal