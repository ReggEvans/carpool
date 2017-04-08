const checkAuth = function(req, res, next){
  if(!req.user) {
    res.status(400).send( 'no authenticated user for current session' )
  }
  else next()
}

const errorHandler = function(err, req, res, next) {
  console.log(err)
  res.render(err);
  return
} 

const cookifyUser = function(req,res,next) {
  if (req.user) {
    res.cookie(global.PROJECT_NAME + '_user',JSON.stringify(req.user))
    res.cookie('tiy_full_stack_app_name', global.PROJECT_NAME)
    next()
  }
  else {
    console.log('no user')
    res.cookie(global.PROJECT_NAME + '_user','null')
    res.cookie('tiy_full_stack_app_name', global.PROJECT_NAME)
    next()
  }
}

const parseRegEx = function(request,response,next) {
  for (var prop in request.query) {
    if (request.query[prop][0] === '/' && request.query[prop].slice(-1) === '/') {
       request.query[prop] = new RegExp(request.query[prop].slice(1,-1))
    }
  }
  next()
}

module.exports = {
  checkAuth: checkAuth,
  errorHandler: errorHandler,
  cookifyUser: cookifyUser,
  parseRegEx: parseRegEx
}

