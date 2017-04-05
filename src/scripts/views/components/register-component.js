import React from 'react'
import Backbone from 'backbone'
import STORE from '../../store'
import ACTIONS from '../../actions'

var RegisterComponent = React.createClass({
	_handleClick: function(){
		STORE.set({
			showLogin: true,
			showRegister: false

		})
	},
	_handleSubmit: function(evt) {
		evt.preventDefault()
		var formInput = evt.target
		var userData = {
				prefix: formInput.prefix.value,
				firstName: formInput.firstName.value,
				lastName: formInput.lastName.value,
				email: formInput.email.value,
				password: formInput.password.value
			}
		ACTIONS.registerUser(userData)
		formInput.reset()
	},
	render: function() {
		if (this.props.registerState){
			return (
				<div className='login-component fade-in'>
					<div className='register-form-wrapper'>
						<h5>REGISTER</h5>
						<form onSubmit={this._handleSubmit}>
							<select name="prefix" >
								<option></option>
				 				<option value="Mr.">Mr.</option>
				 				<option value="Ms.">Ms.</option>
				 			</select>
							<input name='firstName' type='text' id='input-col' placeholder='FIRST NAME' />
							<input name='lastName' type='text' id='input-row' placeholder='LAST NAME' />
							<input name='email' type='text' id='input-row' placeholder='EMAIL' /> <br />
							<input name='password' type='password' id='input-row' placeholder='PASSWORD' /> <br />
							<input name='submit' type="submit" value="REGISTER" className='log-in-button'/><br />
						</form>
					</div>
					<p>Already registered? &nbsp; <button onClick={this._handleClick}>Login</button></p>
				</div>
			)
		}
		return null
	}
})

export default RegisterComponent