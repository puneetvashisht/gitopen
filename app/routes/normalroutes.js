/*
var log4js = require('log4js');
log4js.configure('log4js/config.json', { reloadSecs: 1000 });

var logger = log4js.getLogger('NormalRoutesLogger');
logger.setLevel('trace');
*/


//var isLoggedIn = require('./util/isLoggedIn');


module.exports = function (app, logger){
// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function (req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', function (req, res) {
//    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user
        });
    });

    // Application  SECTION =========================
    app.get('/test', function (req, res) {
//    app.get('/test', isLoggedIn, function (req, res) {
        res.render('test.ejs', {
            user: req.user
        });
    });
    }