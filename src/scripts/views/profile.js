import React from 'react'
import Backbone from 'backbone'
import STORE from '../store'
import ACTIONS from '../actions'

var Profile = React.createClass({
	_makePickupList: function(pickupModel) {
		var studentID = this.props.studentModel.get('_id')
		var pickupID = pickupModel.get('student_id')
		var date = pickupModel.get('createdAt')
		var time = pickupModel.get('createdAt')
		var parent = pickupModel.get('parent')
		if (pickupID === studentID) {
			return <p key={pickupModel.cid}>{moment(date).format('MM/DD')} &nbsp;|&nbsp; {moment(date).format('hh:mm A')} &nbsp;|&nbsp; {parent}</p>
		}
	},
	render: function() {
		var profileModal = 'profileModal'
		var modalBackground = 'modalBackground'
		if (this.props.showProfileModal) {
			return (
				<div className={modalBackground}>
					<div className={profileModal}>
						<div className='profile-container'>
							<h4>{this.props.studentModel.get('firstName')} {this.props.studentModel.get('lastName')}</h4>
							<button className='profile-close-button' onClick={ACTIONS.cancelProfileModal}>X</button>
							<div className='profile-info'>
								<div className='profile-photo'>
									<img src={this.props.studentModel.get('photo')} width='200' height='225'/>
								</div>
								<div className='info-box-1'>
									<p>First Name: &nbsp; <span className='info-white'>{this.props.studentModel.get('firstName')}</span></p>
									<p>Last Name: &nbsp; <span className='info-white'>{this.props.studentModel.get('lastName')}</span></p>
									<p>Student ID: &nbsp; <span className='info-white'>{this.props.studentModel.get('student_id')}</span></p>
									<p>Home Room: &nbsp; <span className='info-white'>{this.props.studentModel.get('home_room')}</span></p>
									<p>Grade: &nbsp; <span className='info-white'>{this.props.studentModel.get('grade')} Grade</span></p>
									<p>Date of Birth: &nbsp; <span className='info-white'>{this.props.studentModel.get('dob')} &nbsp;</span> Age: &nbsp;<span className='info-white'>{this.props.studentModel.get('age')}</span></p>
								</div>
								<div className='info-wrapper'>
									<div className='info-box-2'>
										<p>Address: &nbsp; <span className='info-white'>{this.props.studentModel.get('address')}</span></p>
										<p>City: &nbsp; <span className='info-white'>{this.props.studentModel.get('city')}</span></p>
										<p>Phone 1: &nbsp; <span className='info-white'>{this.props.studentModel.get('phone_1')}</span></p>
										<p>Phone 2: &nbsp; <span className='info-white'>{this.props.studentModel.get('phone_2')}</span></p>
										<p>Email: &nbsp; <span className='info-white' id='email'>{this.props.studentModel.get('email')}</span></p>
									</div>
									<div className='info-box-2'>
										<p>State: &nbsp; <span className='info-white'>{this.props.studentModel.get('state')}</span></p>
										<p>Zip: &nbsp; <span className='info-white'>{this.props.studentModel.get('zip')}</span></p>
										<p>Authorized Drivers: &nbsp;</p>
										<p><span className='info-white'>{this.props.studentModel.get('authDrivers')[0]}</span></p>
										<p><span className='info-white'>{this.props.studentModel.get('authDrivers')[1]}</span></p>
									</div>
								</div>		
							</div>
							<div className='profile-history'>
								<h6>Pickup History</h6>
								<div className='pickup-list'>
									{this.props.pickupCollection.map(this._makePickupList)}
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}
		return null
	}
})

export default Profile