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
  student_id:   { type: String },
  photo:        { type: String },
  age:          { type: Number },
  dob:          { type: String },
  phone_1:      { type: String },
  phone_2:      { type: String },
  email:        { type: String },
  address:      { type: String },
  city:         { type: String },
  state:        { type: String },
  zip:          { type: String },
  grade:        { type: String },
  home_room:    { type: String },
  authDrivers:  [ String ],
  teacher_id :  { type: String },
  stage:        { type: Number, default: 1, max: 4},
  zone:         { type: Number, default: 1, },
  currentDriver:{ type: String }
})

const pickupSchema = new mongoose.Schema({
  student_id:   { type: String, required: true },
  parent:       { type: String, required: true },
  createdAt:    { type: Date, default: Date.now }
})

module.exports = {
  User: mongoose.model('User', usersSchema),
  Teacher: mongoose.model('Teacher', teacherSchema),
  Student: mongoose.model('Student', studentSchema),
  Pickup: mongoose.model('Pickup', pickupSchema)
}
