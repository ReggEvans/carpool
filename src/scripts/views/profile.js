import React from 'react'
import Backbone from 'backbone'
import STORE from '../store'
import ACTIONS from '../actions'

var Profile = React.createClass({
	render: function() {
		return (
			<div className='profile-container'>
				<h1>My Profile</h1>
			</div>
		)
	}
})

export default Profile