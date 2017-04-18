let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
let Teacher = require('../db/schema.js').Teacher
let Student = require('../db/schema.js').Student
let Pickup = require('../db/schema.js').Pickup
  
  //------------------------------------
  //User Routes
  //------------------------------------
  apiRouter
    .get('/users', function(req, res){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })
    .put('/users/:_id', function(req, res){
      User.findByIdAndUpdate(req.params._id, req.body, function(err, record){
          if (err) {
            res.status(500).send(err)
          }
          else if (!record) {
            res.status(400).send('no record found with that id')
          }
          else {
            res.json(Object.assign({},req.body,record))
          }
      })
    })
    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })

//------------------------------------
// Student Routes
//------------------------------------
  apiRouter
    .get('/student', function(request, response){
      Student.find(request.query, function(err, results){
        if(err) return response.json(err) 
        response.json(results)
      })
    })
    .get('/student/:_id', function(request, response){
      Student.findById(request.params._id, function(err, record){
        if(err || !record ) return response.json(err) 
        response.json(record)
      })
    })
    .post('/student', function(request, response){
      var newStudent = new Student(request.body)
      newStudent.save(function(error, record){
        if (error) {
          return response.status(400).json(error)
        }
        response.json(record)
      })
    })
    .delete('/student/:_id', function(request,response){
        Student.remove({_id: request.params._id}, function(error) {
          if (error) {
            return response.status(400).json(error)
          }
          response.json({
            msg: `Student ID ${request.params._id} has been deleted.`,
            _id: request.params._id
          })
        })
      })
    .put('/student/:_id', function(request, response){
      Student.findByIdAndUpdate(request.params._id, request.body, {new: true}, function(error, record){
          if (error) {
            response.status(500).send(error)
          }
          else if (!record) {
            response.status(400).send('no record found with that id')
          }
          else {
            response.json(record)
          }
      })
    })

//------------------------------------
// Teacher Routes
//------------------------------------
  apiRouter
    .get('/teacher', function(req, res){
      Teacher.find(req.query, function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })
    .post('/teacher', function(request, response){
      var newTeacher = new Teacher(request.body)
      newTeacher.save(function(error, record){
        if (error) {
          return response.status(400).json(error)
        }
        response.json(record)
      })
    })
    .delete('/teacher/:_id', function(request,response){
        Teacher.remove({_id: request.params._id}, function(error) {
          if (error) {
            return response.status(400).json(error)
          }
          response.json({
            msg: `Teacher ID ${request.params._id} has been deleted.`,
            _id: request.params._id
          })
        })
      })

//------------------------------------
// Pickup Routes
//------------------------------------
  apiRouter
    .get('/pickup', function(req, res){
      Pickup.find(req.query, function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      }).sort('-createdAt')
    })
    .get('/pickup/:student_id', function(request, response){
      Pickup.find({student_id: request.params.student_id}, function(err, record){
        if(err || !record ) return response.json(err) 
        response.json(record)
      })
    })
    .post('/pickup', function(request, response){
      var newPickup = new Pickup(request.body)
      newPickup.save(function(error, record){
        if (error) {
          return response.status(400).json(error)
        }
        response.json(record)
      })
    })
    .delete('/pickup/:_id', function(request,response){
        Pickup.remove({_id: request.params._id}, function(error) {
          if (error) {
            return response.status(400).json(error)
          }
          response.json({
            msg: `Pickup ID ${request.params._id} has been deleted.`,
            _id: request.params._id
          })
        })
      })

module.exports = apiRouter