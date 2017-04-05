import React from 'react'
import Backbone from 'backbone'
import STORE from '../../store'

var SplashHeader = React.createClass({
	_handleLoginButton: function(){
		STORE.set({
			showLogin: true,
			showRegister: false
		})
	},
	_handleRegisterButton: function(){
		STORE.set({
			showLogin: false,
			showRegister: true
		})
	},
	render: function() {
		return (
			<div className='splash-header'>
				<h2><span className='in-title'>Kinder</span>Q</h2>
				<div className='header-buttons'>
					<button onClick={this._handleLoginButton}>LOGIN</button>
					<button onClick={this._handleRegisterButton}>REGISTER</button>
				</div>
			</div>
		)
	}
})

export default SplashHeader