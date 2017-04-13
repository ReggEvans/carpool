import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'

import Splash from './views/splash'
import Dashboard from './views/dashboard'
import Valet from './views/valet'
import Class from './views/class'
import Profile from './views/profile'
import Teachers from './views/teachers'
import Students from './views/students'
import Settings from './views/settings'

const app = function() {
  var MainRouter = Backbone.Router.extend({
  	routes: {
      "splash" : "handleSplashView",
  		"dashboard" : "handleDashboardView",
      "valet" : "handleValetView",
      "class" : "handleClassView",
      "profile" : "handleProfileView",
  		"teachers" : "handleTeacherView",
  		"students" : "handleStudentView",
  		"settings" : "handleSettingView",
  		"*default" : "home"
  	},
  	home: function() {
  		location.hash = User.getCurrentUser() ? 'dashboard' : 'splash'
  	},
    handleSplashView: function() {
      ReactDOM.render(<Splash />, document.querySelector('.container'))
    },
  	handleDashboardView: function() {
  		ReactDOM.render(<Dashboard />, document.querySelector('.container'))
  	},
    handleValetView: function() {
      ReactDOM.render(<Valet />, document.querySelector('.container'))
    },
    handleClassView: function() {
      ReactDOM.render(<Class />, document.querySelector('.container'))
    },
    handleProfileView: function() {
      ReactDOM.render(<Profile />, document.querySelector('.container'))
    },
  	handleTeacherView: function() {
  		ReactDOM.render(<Teachers />, document.querySelector('.container'))
  	},
  	handleStudentView: function() {
  		ReactDOM.render(<Students />, document.querySelector('.container'))
  	},
  	handleSettingView: function() {
  		ReactDOM.render(<Settings />, document.querySelector('.container'))
  	},
  })
  new MainRouter()
  Backbone.history.start()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..