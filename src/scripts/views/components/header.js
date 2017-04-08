import React from 'react'

var Header = React.createClass({
	render: function() {
		return (
			<div className='page-header'>
				<nav>
					<a href="#dashboard">Dashboard </a>
					<a href="#valet">Valet View </a>
					<a href="#class">My Class </a>
					<a href="#settings">Settings </a>
				</nav>
			</div>
		)
	}
})

export default Header