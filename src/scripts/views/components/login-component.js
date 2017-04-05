import React from 'react'
import Backbone from 'backbone'
import STORE from '../../store'
import ACTIONS from '../../actions'

var LoginComponent = React.createClass({
	_handleClick: function(){
		STORE.set({
			showLogin: false,
			showRegister: true
		})
	},
	_handleSubmit: function(evt) {
		evt.preventDefault()
		var formInput = evt.target
		ACTIONS.loginUser(formInput.email.value, formInput.password.value)
		formInput.reset()
	},
	render: function() {
			if (this.props.loginState){
				return (
					<div className='login-component fade-in'>
						<div className='login-form-wrapper'>
							<h5>LOGIN</h5>
							<form onSubmit={this._handleSubmit}>
								<input name='email' type='text' placeholder='EMAIL' />
								<input name='password' type='password' placeholder='PASSWORD' />
								<input name='submit' type="submit" value="LOG IN" className='log-in-button'/>
							</form>
						</div>
						<p>Don't have an account? &nbsp; <button onClick={this._handleClick}>Register</button></p>
					</div>
				)
			}
			return null
		}
})

export default LoginComponent