import React from 'react'
import Backbone from 'backbone'
import STORE from '../../store'
import ACTIONS from '../../actions'

var Drivers = React.createClass({
	_handleIncreaseStage: function() {
		ACTIONS.increaseStage(this.props.studentModel)
	},
	_handleData: function(driver) {
		// need to set up a new schema and store this data to the db
		console.log(driver, this.props.studentModel.get('_id'), this.props.studentModel.get('firstName'))
	},
	_listDrivers: function(driver) {
		return <button className='authDrivers' onClick={(event) => { this._handleIncreaseStage(); this._handleData(driver)}} key={driver}><i className="material-icons arrow">directions_car</i> {driver}</button>
	},
	_handleChange: function(event) {
		console.log(event.target.value)
	},
	render: function() {
		var valetPopUp = 'active'
		var modalBackground = 'modalBackground'
		if (this.props.showDriverModal) {
			return (
				<div className={modalBackground}>
					<div className={valetPopUp}>
						<h5>Who's picking up {this.props.studentModel.get('firstName')} today?</h5>
						<div className='driver-list'>
							<div className='driver-title'>
								<p>Authorized Drivers</p>
							</div>
							<form>
								<select id="zone" onChange={this._handleChange}>
									<option value="select">Please Choose a Zone</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">2</option>
								</select>
							</form>
							<div>
								{this.props.studentModel.get('authDrivers').map(this._listDrivers)}
							</div>
							<button id='cancel' onClick={ACTIONS.cancelDriverModal}>CANCEL</button>
						</div>
					</div>
				</div>
			)
		}
		return null
	}
})

export default Drivers