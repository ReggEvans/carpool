import React from 'react'
import Backbone from 'backbone'
import STORE from '../store'
import ACTIONS from '../actions'

import Profile from './profile'
import StudentQueue from './components/queue'
import Drivers from './components/drivers'
import Header from './components/header'
import Footer from './components/footer'

var Valet = React.createClass({
	componentWillMount: function() {
		ACTIONS.fetchAllData()
		ACTIONS.fetchStudentData()
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
	_handleType: function(e){
		var input = e.target.value.toLowerCase()
		ACTIONS.autoSearch(input)
	},
	_clearInput: function() {
		this.refs.input.value = ''
		ACTIONS.fetchStudentData()

	},
	render: function() {
		var date = new Date()
		return (
			<div className='valet-container'>
				<div className='page-header'>
					<h4>ValetView</h4>
				</div>
				<div className='post-header'>
					<a href='#dashboard'>
						<div className='home-icon'><i className="material-icons">home</i></div>
					</a>
					<a href='#dashboard'>
						<p>Dashboard</p>
					</a>
					<div className='date'>
						<p>{moment(date).format('MMMM Do YYYY')}</p>
					</div>
				</div>
				<div className='valet-wrapper'>
					<div className='student-valet-wrapper'>
						<input type='text' ref='input' placeholder='Search by last name...' onKeyUp={this._handleType}/>
						<button onClick={this._clearInput}>CLEAR</button>
						<Profile showProfileModal={this.state.showProfileModal}
								 studentModel={this.state.studentModel}
								 pickupCollection={this.state.pickupCollection}/>
						<Drivers showDriverModal={this.state.showDriverModal}
								 studentModel={this.state.studentModel}/>
						<StudentValet 
							studentCollection={this.state.studentCollection}
							studentSearchCollection={this.state.searchStudents}
							activeID={this.state.activeID} />
					</div>
					<div className='queue-wrapper'>
						<StudentQueue 
							studentCollection={this.state.studentCollection}
							activeID={this.state.activeID} />
					</div>
				</div>
				
			</div>
		)
	}
})

var StudentValet = React.createClass({
	_makeStudentList: function(model) {
			return (
				<StudentValetList 
					studentModel={model} 
					key={model.cid}
					activeID = {this.props.activeID} />
			)
	},
	render: function() {
		return (
			<div className='student-overflow'>
				{this.props.studentSearchCollection.map(this._makeStudentList)}
			</div>
		)
	}
})

var StudentValetList = React.createClass({
	_handleClick: function() {
		ACTIONS.setActiveID(this.props.studentModel.get('_id'))
	},
	_handleIncreaseStage: function() {
		ACTIONS.increaseStage(this.props.studentModel)
	},
	_handleProfile: function() {
		ACTIONS.showProfileModal(this.props.studentModel)	
	},
	_handleDriverModal: function() {
		ACTIONS.showDriverModal(this.props.studentModel)	
	},
	render: function() {
		var valetPopUp = 'hidden'
		var modalBackground = 'hidden'
		if (this.props.activeID === this.props.studentModel.get('_id')) {
			valetPopUp = 'active'
			modalBackground = 'modalBackground'
		}
		//var displayCLass = this.props.studentModel.get('stage') === 1 ? 'there' : 'not-there'
		if (this.props.studentModel.get('stage') === 1) {
			return (
				<div>
					{/*<div className={`modalBackground ${displayCLass}`}>*/}
					<div className={modalBackground}>
						<div className={valetPopUp}>
							<h5>{this.props.studentModel.get('firstName')}&nbsp;{this.props.studentModel.get('lastName')}</h5>
							<div className='driver-list'>
								<div className='driver-title'>
									<p>Please Choose an option</p>
								</div>
							</div>
							<button onClick={this._handleDriverModal}>RIDE HAS ARRIVED</button>
							<button id='profile' onClick={this._handleProfile}>STUDENT PROFILE</button>
							<button id='cancel' onClick={ACTIONS.unsetActiveID}>CANCEL</button>
						</div>
					</div>
					{/*</div>*/}
					<div onClick={this._handleClick} className='valet-student-list'>
						<p>{this.props.studentModel.get('firstName')}&nbsp;{this.props.studentModel.get('lastName')}</p>
					</div>
				</div>
			)
		}	
		return null
	}
})

export default Valet