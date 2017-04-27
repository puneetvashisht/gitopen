var models = require('./models/schema');
var fs = require('fs');
var authroutes = require('./routes/authroutes');
var normalroutes = require('./routes/normalroutes');
var setup = require('./routes/setup');
var quizroutes = require('./routes/quizroutes');
var pollroutes = require('./routes/pollroutes');
var contactroutes = require('./routes/contactroutes');

var userroutes = require('./routes/internalUse/user');


module.exports = function (app, passport, logger) {

    // pass passport for configuration
    require('../config/passport')(passport, logger);

    // authruotes
    authroutes(app, passport, logger);
    // normal routes
    normalroutes(app, logger);
    // setup
    setup(app, logger);
    // quizroutes
    quizroutes(app, passport, logger);
    // suryverroutes
    pollroutes(app, logger);
    // contactroutes
    contactroutes(app, logger);
	
	
    userroutes(app, logger);
    // socketApp
//    socketapp(io, logger, app);

/*
    app.get('/processes', function(req, res){
        if(process.env)
            res.json({success: process.env});
        else
            res.json({success: false});
    });
*/

};
