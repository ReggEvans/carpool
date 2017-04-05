import React from 'react'
import Backbone from 'backbone'
import STORE from '../store'
import ACTIONS from '../actions'

import SplashHeader from './components/splash-header'
import LoginComponent from './components/login-component'
import RegisterComponent from './components/register-component'
import Footer from './components/footer'

var Splash = React.createClass({
	componentWillMount: function() {
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},
	componentWillUnmount: function() {
		STORE.off('dataUpdated')
	},
	getInitialState: function() {
		return STORE.data
	},
	render: function() {
		return (
			<div className='splash-container'>
				<SplashHeader />
				<LoginComponent 
					loginState={this.state.showLogin}
					registerState={this.state.showRegister} />
				<RegisterComponent 
					loginState={this.state.showLogin}
					registerState={this.state.showRegister} />
				<Footer />
			</div>
		)
	}
})

export default Splash