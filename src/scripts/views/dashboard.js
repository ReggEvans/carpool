import React from 'react'
import Backbone from 'backbone'
import STORE from '../store'
import ACTIONS from '../actions'

var Dashboard = React.createClass({
	componentWillMount: function() {
		ACTIONS.fetchAllData()
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},
	getInitialState: function() {
		return STORE.data
	},
	componentWillUnmount: function() {
		STORE.off()
	},
	render: function() {
		return (
			<div className='dashboard-container'>
				<h1>Dashboard</h1>
				<div className='dash-buttons'>
					<a href='#valet'>
						<div className='button valet-button'>
							<p>Valet View</p>
						</div>
					</a>
					<a href='#class'>
						<div className='button myClass-button'>
							<p>My Class</p>
						</div>
					</a>
					<a href='#profile'>
						<div className='button myProfile-button'>
							<p>My Profile</p>
						</div>
					</a>
					<a href='#teachers'>
						<div className='button teacher-button'>
							<p>View All Teachers</p>
						</div>
					</a>
					<a href='#students'>
						<div className='button student-button'>
							<p>View All Students</p>
						</div>
					</a>
					<a href='#settings'>
						<div className='button settings-button'>
							<p>Settings</p>
						</div>
					</a>
				</div>
			</div>
		)
	}
})

export default Dashboard