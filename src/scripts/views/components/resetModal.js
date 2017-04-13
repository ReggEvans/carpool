import React from 'react'
import Backbone from 'backbone'
import STORE from '../../store'
import ACTIONS from '../../actions'

var ResetModal = React.createClass({
	_handleReset: function() {
		ACTIONS.resetStudentsStage(this.props.students)
		ACTIONS.cancelResetModal()
	},
	_handleCancel: function() {
		ACTIONS.cancelResetModal()
	},
	render: function(){
		var valetPopUp = 'active'
		var modalBackground = 'modalBackground'
		if (this.props.modalState) {
			return(
				<div className={modalBackground}>
					<div className={valetPopUp}>
						<h5>ARE YOU SURE?</h5>
						<p className='reset-warning'>Clicking "Yes, I'm sure" will reset the application for the next day.</p>
						<button onClick={this._handleReset}>YES, I'M SURE</button>
						<button id='cancel' onClick={this._handleCancel}>CANCEL</button>
					</div>
				</div>
			)
		}
		return null
	}
})


export default ResetModal