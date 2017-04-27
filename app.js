const express = require("express"),
      mongoose = require('mongoose');

var app = express();
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

let http = require('http').Server(app);
let io = require('socket.io')(http);

var log4js = require('log4js');
var log4js_extend = require("log4js-extend");

log4js.configure('log4js/config.json', { reloadSecs: 1000 });

log4js_extend(log4js, {
    path: __dirname,
    format: ":>> log at @name (@file-@line:@column)"
});

var logger = log4js.getLogger('MyLogger');
// logger.setLevel('trace');

/*
logger.trace('Entering cheese testing in blue');
logger.debug('Got cheese in sky blue');
logger.info('Cheese is Gouda in green');
logger.warn('Cheese is quite smelly in yellow');
logger.error('Cheese is too ripe! in red');
logger.fatal('Cheese was breeding ground for listeria in purple');
*/


/*//openshift mongo port or local port
var mongo_port = process.env.OPENSHIFT_MONGODB_DB_PORT || 27017
var mongo_ip_address = process.env.OPENSHIFT_MONGODB_DB_HOST || '127.0.0.1'
//openshift node port or local port
var node_server_port = process.env.NODE_PORT || 3000;
var node_server_ip_addressvar = process.env.NODE_IP || 'localhost';

var dbConnectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'localhost';*/

var node_server_port = process.env.NODE_PORT || 3000;
var node_server_ip_addressvar = process.env.NODE_IP || 'localhost';


// db change ======================================================================
//mongoose.connect('mongodb://admin:PJH5LGmp4e8x@mongo_ip_address:mongo_port/dswebsite');
//mongoose.connect('mongodb://admin:PJH5LGmp4e8x@579f8e382d52716a3400007c-vinodkumar88.rhcloud.com:44556/');

//mongoose.connect('mongodb://admin:uCHsz-39DxUW/');

//mongoose.connect(dbConnectionString);
var configDB = require('./config/database.js');

// configuration ===============================================================
var db = mongoose.connect(configDB.url); // connect to our database
// db change ======================================================================



// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Configuration from APP
//app.use(express.static('static'));
app.use('/', express.static(__dirname + '/dist'));
app.use('/slides/angular2', express.static(__dirname + '/slides'));

app.post("/get/process/info/1", function(request, response){
    response.json(process.env);
});
/*
app.post("/get/process/info/2", function(request, response){
    var data = "<h1>Hello Nodejs on openshift</h1>";
//    data += "<ul><li>mongo_port : "+mongo_port+"</li><li>mongo_ip_address: "+mongo_ip_address+"</li><li>node_server_port: "+node_server_port+"</li><li>node_server_ip_addressvar: "+node_server_ip_addressvar+"</li></ul>";
    
    data += "<hr/>";
    data += "<ul>"; 
    if(process.env.OPENSHIFT_MONGODB_DB_HOST)
    data += "<li>OPENSHIFT_MONGODB_DB_HOST : "+process.env.OPENSHIFT_MONGODB_DB_HOST+"</li>";
    if(process.env.OPENSHIFT_MONGODB_DB_PORT)
    data += "<li>OPENSHIFT_MONGODB_DB_PORT : "+process.env.OPENSHIFT_MONGODB_DB_PORT+"</li>";
    if(process.env.OPENSHIFT_MONGODB_DB_USERNAME)
    data += "<li>OPENSHIFT_MONGODB_DB_USERNAME : "+process.env.OPENSHIFT_MONGODB_DB_USERNAME+"</li>";
    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD)
    data += "<li>OPENSHIFT_MONGODB_DB_PASSWORD : "+process.env.OPENSHIFT_MONGODB_DB_PASSWORD+"</li>";
    if(process.env.OPENSHIFT_MONGODB_DB_URL)
    data += "<li>OPENSHIFT_MONGODB_DB_URL : "+process.env.OPENSHIFT_MONGODB_DB_URL+"</li>";
    data += "<li>dbConnectionString : "+configDB.url+"</li>";
    data += "</ul>";

    response.send(data);
//    response.send("Hello!");
});
*/
app.post("/get/process/info/2", function(request, response){
    let data = {
		"OPENSHIFT_MONGODB_DB_HOST":process.env.OPENSHIFT_MONGODB_DB_HOST,
		"OPENSHIFT_MONGODB_DB_PORT":process.env.OPENSHIFT_MONGODB_DB_PORT,
		"OPENSHIFT_MONGODB_DB_USERNAME":process.env.OPENSHIFT_MONGODB_DB_USERNAME,
		"OPENSHIFT_MONGODB_DB_PASSWORD":process.env.OPENSHIFT_MONGODB_DB_PASSWORD,
		"OPENSHIFT_MONGODB_DB_URL":process.env.OPENSHIFT_MONGODB_DB_URL,
		"dbConnectionString":configDB.url
	};

    response.json(data);
});


if(node_server_ip_addressvar) {
	http.listen(node_server_port, node_server_ip_addressvar, () => {
        logger.info("The magic happens on  " + node_server_ip_addressvar + ":" + node_server_port);
	});
} else {
	http.listen(node_server_port, () => {
        logger.info("The magic happens on:" + node_server_port);
	});
}


/*

app.listen(node_server_port, node_server_ip_addressvar, function () {
  console.log(`Application worker ${process.pid} started...`);
});
*/
require('./app/routes.js')(app, passport, logger); // load our routes and pass in our app and fully configured passport
require('./app/sockets.js')(io, logger);

