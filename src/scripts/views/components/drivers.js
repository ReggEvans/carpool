import React from 'react'
import Backbone from 'backbone'
import STORE from '../../store'
import ACTIONS from '../../actions'

var Drivers = React.createClass({
	_handleIncreaseStage: function() {
		ACTIONS.increaseStage(this.props.studentModel)
	},
	_handleData: function(driver) {
		ACTIONS.saveDriver(driver, this.props.studentModel)
	},
	_listDrivers: function(driver) {
		return <button className='authDrivers' onClick={(event) => { this._handleIncreaseStage(); this._handleData(driver)}} key={driver}><i className="material-icons arrow">directions_car</i> {driver}</button>
	},
	_handleChange: function(event) {
		var zoneNum = event.target.value
		var model = this.props.studentModel
		ACTIONS.saveZone(zoneNum, model)
	},
	render: function() {
		var valetPopUp = 'active'
		var modalBackground = 'modalBackground'
		if (this.props.showDriverModal) {
			return (
				<div className={modalBackground}>
					<div className={valetPopUp} id='drivers'>
						<h5>Who is picking up {this.props.studentModel.get('firstName')} today?</h5>
						<div className='driver-list'>
							<div className='driver-title'>
								<p>Please choose a zone and an Authorized Driver</p>
							</div>
							<form className='driverForm'>
								<select id='zone' onChange={this._handleChange}>
									<option value="select">Zone Number</option>
									<option value="1">Zone 1</option>
									<option value="2">Zone 2</option>
									<option value="3">Zone 3</option>
									<option value="4">Zone 4</option>
									<option value="5">Zone 5</option>
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