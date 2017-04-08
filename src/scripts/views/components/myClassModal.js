import React from 'react'
import Backbone from 'backbone'
import STORE from '../../store'
import ACTIONS from '../../actions'

var MyClassModal = React.createClass({
	_handleIncreaseStage: function() {
		  ACTIONS.increaseStage(this.props.studentModel)
	},
	render: function(){
		var valetPopUp = 'active'
		var modalBackground = 'modalBackground'
		if (this.props.myClassModalState) {
			return(
				<div className={modalBackground}>
					<div className={valetPopUp}>
						<h3>Modal Student Test</h3>
						
						<button onClick={ACTIONS.deactivateStudent}>CANCEL</button>
						
					</div>
				</div>
			)
		}
		return null
	}
})


export default MyClassModal