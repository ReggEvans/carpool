import React from 'react'
import Backbone from 'backbone'
import STORE from '../../store'
import ACTIONS from '../../actions'

var StudentQueue = React.createClass({
	render: function() {
		return (
			<div className='queue-container'>
				<h6>Current Queue</h6>
				<StudentQueueGroup 
					studentCollection={this.props.studentCollection}
					activeID={this.props.activeID} />
			</div>
		)
	}
})

var StudentQueueGroup = React.createClass({
	_makeStudentList: function(model) {
			return (
				<StudentQueueList 
					studentModel={model}
					activeID={this.props.activeID} 
					key={model.cid} />
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

var StudentQueueList = React.createClass({
	_handleClick: function() {
		ACTIONS.setActiveID(this.props.studentModel.get('_id'))
	},
	_handleIncreaseStage: function() {
		ACTIONS.increaseStage(this.props.studentModel)
		ACTIONS.unsetActiveID()
	},
	render: function() {
		var stageThree = {
			backgroundColor: "lightgreen"
		}
		var valetPopUp = 'hidden'
		var modalBackground = 'hidden'
		if (this.props.activeID === this.props.studentModel.get('_id')) {
			valetPopUp = 'active'
			modalBackground = 'modalBackground'
		}
		if (this.props.studentModel.get('stage') === 2) {
			return (
				<div>
					<div className={modalBackground}>
						<div className={valetPopUp}>
							<h5>{this.props.studentModel.get('firstName')}&nbsp;{this.props.studentModel.get('lastName')}</h5>
							<button id='cancel' onClick={ACTIONS.unsetActiveID}>CANCEL</button>
						</div>
					</div>
					<div className='student-queue-list' onClick={this._handleClick}>
						<div className='status-arrival'></div>
						<p>{this.props.studentModel.get('firstName')}&nbsp;{this.props.studentModel.get('lastName')}</p> <br/>
						<p id='small-arrival'>Your ride is here!</p>
					</div>
				</div>
			)
		}
		if (this.props.studentModel.get('stage') === 3) {
			return (
				<div>
					<div className={modalBackground}>
						<div className={valetPopUp}>
							<h5>{this.props.studentModel.get('firstName')}&nbsp;{this.props.studentModel.get('lastName')}</h5>
							<button onClick={this._handleIncreaseStage}>GOING HOME</button>
							<button id='cancel' onClick={ACTIONS.unsetActiveID}>CANCEL</button>
						</div>
					</div>
					<div className='student-queue-list' onClick={this._handleClick}>
						<div className='status-transit'></div>
						<p>{this.props.studentModel.get('firstName')}&nbsp;{this.props.studentModel.get('lastName')}</p> <br />
						<p id='small-transit'>On the way!</p>
					</div>
				</div>
			)
		}
		return null
	}
})

export default StudentQueue