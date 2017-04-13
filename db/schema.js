const mongoose = require('mongoose');

// ----------------------
// USERS
// ----------------------
const usersSchema = new mongoose.Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
  
   // example of optional fields
  prefix:    { type: String, required: true },
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

const teacherSchema = new mongoose.Schema({
  prefix:     { type: String, required: true },
  firstName:  { type: String, required: true },
  lastName:  	{ type: String, required: true },
})

const studentSchema = new mongoose.Schema({
  firstName:    { type: String, required: true },
  lastName:  	  { type: String, required: true },
  authDrivers:  [ String ],
  teacher_id :  { type: String },
  stage:        { type: Number, default: 1, max: 4}
})

module.exports = {
  User: mongoose.model('User', usersSchema),
  Teacher: mongoose.model('Teacher', teacherSchema),
  Student: mongoose.model('Student', studentSchema)
}
