import React from 'react'
import Backbone from 'backbone'
import STORE from '../../store'
import ACTIONS from '../../actions'

var TeacherModal = React.createClass({
	_handleType: function(e){
	var input = e.target.value.toLowerCase()
	ACTIONS.autoSearchTeacher(input)
	},
	render: function(){
		var valetPopUp = 'active'
		var modalBackground = 'modalBackground'
		if (this.props.modalState) {
			return(
				<div className={modalBackground}>
					<div className={valetPopUp}>
						<h5>Select a classroom</h5>
						<input type='text' ref='input' placeholder='Search by last name...' className='teacherSearch' onKeyUp={this._handleType}/>
						<TeacherGroup 
							teachers={this.props.teachers}
							searchTeachers={this.props.teacherSearchCollection} />	
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
				{this.props.searchTeachers.map(this._makeTeacherList)}
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
			<div className='teacher-modal-list'>
				<button id='teacher-modal-button' onClick={this._handleTeacherID}>
					{this.props.teacherModel.get('firstName')}&nbsp;{this.props.teacherModel.get('lastName')}
				</button>
				<p className='scroll-text-right'>SCROLL &#8680;</p>
				<p className='scroll-text-left'>&#8678; SCROLL</p>
			</div>
		)
	}
})

export default TeacherModal