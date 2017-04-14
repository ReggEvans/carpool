import React from 'react'
import Backbone from 'backbone'
import STORE from '../store'
import ACTIONS from '../actions'

var Profile = React.createClass({
	render: function() {
		var profileModal = 'profileModal'
		var modalBackground = 'modalBackground'
		if (this.props.showProfileModal) {
			return (
				<div className={modalBackground}>
					<div className={profileModal}>
						<div className='profile-container'>
							<h2>{this.props.studentModel.get('firstName')}</h2>
							<button onClick={ACTIONS.cancelProfileModal}>X</button>
						</div>
					</div>
				</div>
			)
		}
		return null
	}
})

export default Profile