/*
var log4js = require('log4js');
log4js.configure('log4js/config.json', { reloadSecs: 1000 });

var logger = log4js.getLogger('AuthRoutesLogger');
logger.setLevel('trace');
*/


var models = require('./../models/schema');
//var isLoggedInForRest = require('./util/isLoggedInForRest');
var isLoggedIn = require('./util/isLoggedIn');


module.exports = function (app, passport, logger){

    // LOGOUT ==============================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    // =============================================================================
    // AUTHENTICATE (FIRST LOGIN) ==================================================
    // =============================================================================

	

    // problem with app.get
    app.post('/getLogin', function (req, res, next) {
        req.session.flash = [];
        passport.authenticate('local-login', function (err, user) {
            if (err) {
                return next(err);
            }
			// logout from previous sessions if any
			req.logout();
			
            if (!user) {
                logger.warn("user is not available");
                return res.json({
                    "user": {
                        "isAuthenticated": false,
                        "errorMessage": req.session.flash.loginMessage[0]
                    }
                });
            } else {
                logger.debug('++++++');
                logger.debug(user);                
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                logger.debug('=======');
                return res.json({
                    user: {
                        email: user.local.email,
                        isAuthenticated: true
                    }
                });
            });
        })(req, res, next);
    });


    // SIGNUP =================================
    // show the signup form
    /*
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });
    */

    // process the signup form
    /*
            app.post('/getSignup', passport.authenticate('local-signup', {
                successRedirect : '/profile', // redirect to the secure profile section
                failureRedirect : '/signup', // redirect back to the signup page if there is an error
                failureFlash : true // allow flash messages
            }));
    */
    app.post('/getSignup', function (req, res, next) {
        passport.authenticate('local-signup', function (err, user) {
            logger.debug(req.body);
            if (err) {
                logger.debug('error in req');
                return next(err);
            }
            if (!user) {
                logger.debug('this email is already taken');
                return res.json({
                    "user": {
                        "isAuthenticated": false,
                        "signupMessage": "This email is already taken."
                    }
                });
            } else {
                logger.debug('this email id is available');
                logger.debug(user);
            }
            req.logIn(user, function (err) {
                if (err) {
                    logger.debug('error while saving user in db')
                    return next(err);
                }
                logger.debug('user written in db');
                return res.json({
                    user: {
                        email: user.local.email,
                        isAuthenticated: true
                    }
                });
            });
        })(req, res, next);
    });


    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: 'email'
    }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // twitter --------------------------------

    // send to twitter to do the authentication
    app.get('/auth/twitter', passport.authenticate('twitter', {
        scope: 'email'
    }));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));


    // google ---------------------------------

    // send to google to do the authentication
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // =============================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // =============================================================================

    // locally --------------------------------
    app.get('/connect/local', function (req, res) {
        res.render('connect-local.ejs', {
            message: req.flash('loginMessage')
        });
    });
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/connect/facebook', passport.authorize('facebook', {
        scope: 'email'
    }));

    // handle the callback after facebook has authorized the user
    app.get('/connect/facebook/callback',
        passport.authorize('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // twitter --------------------------------

    // send to twitter to do the authentication
    app.get('/connect/twitter', passport.authorize('twitter', {
        scope: 'email'
    }));

    // handle the callback after twitter has authorized the user
    app.get('/connect/twitter/callback',
        passport.authorize('twitter', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));


    // google ---------------------------------

    // send to google to do the authentication
    app.get('/connect/google', passport.authorize('google', {
        scope: ['profile', 'email']
    }));

    // the callback after google has authorized the user
    app.get('/connect/google/callback',
        passport.authorize('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));



    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function (req, res) {
        var user = req.user;
        user.local.email = undefined;
        user.local.password = undefined;
        user.save(function (err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function (req, res) {
        var user = req.user;
        user.facebook.token = undefined;
        user.save(function (err) {
            res.redirect('/profile');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, function (req, res) {
        var user = req.user;
        user.twitter.token = undefined;
        user.save(function (err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function (req, res) {
        var user = req.user;
        user.google.token = undefined;
        user.save(function (err) {
            res.redirect('/profile');
        });
    });

    app.post('/feedback', function (req, res) {
        //app.post('/feedback',isLoggedInForRest, function (req, res) {

        logger.debug("in feedback route");
        logger.debug(req.body);

        var feedback = new models.Feedback({
            email: req.body.email,
            feedback: req.body.feedback,
            rate: req.body.rate
        });
        logger.debug(feedback);

        feedback.save(function (err) {
            if (err) throw err;
            logger.debug('Feedback saved')
        });


        res.json({
            feedback: feedback
        });

    });


    app.get('/user/scores', function (req, res) {
//    app.get('/user/scores', isLoggedInForRest, function (req, res) {
        //routes.post('/findQuizQuestions', function (req, res) {

        //logger.debug(req);
        logger.debug(req.user.local.email);

        models.UserScore.find({
                username: req.user.local.email
            })
            //.populate('question')
            .exec(function (err, scores) {
                if (err) throw err;

                logger.debug('Printing Data ')
                logger.debug(scores);
                var responseJson = {
                    scoreAvailable: false
                };
                if (scores.length > 0) {
                    /*scores.forEach(function (userscore) {
                        logger.debug(userscore);
                    });*/
                    responseJson.scoreAvailable = true;
                    responseJson.scores = scores;
                }
                res.json(responseJson);
            });
    });



}