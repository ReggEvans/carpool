import React from 'react'
import Backbone from 'backbone'
import STORE from '../store'
import ACTIONS from '../actions'

import StudentQueue from './components/queue'
import Header from './components/header'
import Footer from './components/footer'

var Valet = React.createClass({
	componentWillMount: function() {
		console.log('run')
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
	_handleType: function(e){
		ACTIONS.autoSearch(e.target.value)
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
					<small>{moment(date)}</small>
				</div>
				<div className='valet-wrapper'>
					<div className='student-valet-wrapper'>
						<input type='text' placeholder='Search by last name...' onKeyUp={this._handleType}/>
						<StudentValet 
							studentCollection={this.state.studentCollection}
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
			<div>
				{this.props.studentCollection.map(this._makeStudentList)}
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
	render: function() {
		var valetPopUp = 'hidden'
		var modalBackground = 'hidden'
		if (this.props.activeID === this.props.studentModel.get('_id')) {
			valetPopUp = 'active'
			modalBackground = 'modalBackground'
		}
		if (this.props.studentModel.get('stage') === 1) {
			return (
				<div>
					<div className={modalBackground}>
						<div className={valetPopUp}>
							<h3>Modal Test</h3>
							<p>{this.props.studentModel.get('firstName')}&nbsp;{this.props.studentModel.get('lastName')}</p>
							<button onClick={this._handleIncreaseStage}>RIDE ARRIVED</button>
							<button onClick={ACTIONS.unsetActiveID}>CANCEL</button>
						</div>
					</div>
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