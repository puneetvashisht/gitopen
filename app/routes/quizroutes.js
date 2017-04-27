/*
var log4js = require('log4js');
log4js.configure('log4js/config.json', { reloadSecs: 1000 });

var logger = log4js.getLogger('QuizRoutesLogger');
logger.setLevel('trace');
*/


var models = require('./../models/schema');
//var isLoggedInForRest = require('./util/isLoggedInForRest');

module.exports = function (app, passport, logger){

//app.get('/findUserQuiz',isLoggedInForRest, function (req, res) {
    app.post('/findUserQuiz', function (req, res) {

        logger.debug(req.body);
        let userEmail = req.body.email;
        models.UserQuiz.find({
            user: userEmail
        }, function (err, quizzes) {
            logger.debug('finding UserQuiz');
            if (err) throw err;
            logger.debug(quizzes);
            res.json(quizzes);
        });
    })


    //app.get('/findQuizQuestions',isLoggedInForRest, function (req, res) {
    app.get('/findQuizQuestions/:quizid', function (req, res) {
        //routes.post('/findQuizQuestions', function (req, res) {

        logger.debug(req.params.quizid);

        models.QuizQuestion.find({
                quiz: req.params.quizid
            })
            .populate('question')
            .exec(function (err, data) {
                if (err) throw err;

                logger.debug('Printing Data ------------');
                logger.debug(data);

                models.Quiz.findById(req.params.quizid, function(err, quiz){
                    logger.debug(quiz);
                    logger.debug(quiz.showScores);
                    data[0].showScores = quiz.showScores;

                    // Hide Answers
                    data[0].questions.forEach(function (x) {
                        logger.debug(x)
                        x.answers.forEach(function (y) {
                            y.correct = false
                        })
                    })
                    logger.info('Printing Data After Answers removal------------')
                    logger.debug(data);
                    res.json({result: data[0], showScores: quiz.showScores});
                    //logger.debug(JSON.stringify(data, null, "\t"))

                });

            })

    })


    app.post('/submitQuiz', function (req, res) {
//    app.post('/submitQuiz', isLoggedInForRest, function (req, res) {
        logger.debug(req.body);
        logger.debug('=====+++++++++========');
        logger.debug(req.body.selectedQuiz.quiz);
        models.QuizQuestion.find({
                quiz: req.body.selectedQuiz.quiz
            })
            .populate('question')
            .exec(function (err, data) {
                if (err) throw err;

                logger.debug('Printing Data ------------')
                logger.debug(data)


                // Logic to Calculate Scores
                // req.body.selectedQuiz.questions is client questions object
                // data[0].question is db questions object

                logger.info('Calculating Scores------------');
                logger.debug("Client questions+++++++++++++");
                var clientQuestions = req.body.selectedQuiz.questions;
                var dbQuestions = data[0].questions;

                /*
                                logger.debug('client questions------------------------------------------------------');
                                logger.debug(clientQuestions);
                                logger.debug('db questions------------------------------------------------------');
                                logger.debug(dbQuestions);
                */

                var score = 0;
                logger.debug("initial score " + score);
                for (var i = 0; i < dbQuestions.length; i++) {
                    var currentDbQuestion = dbQuestions[i];
                    var currentClientQuestion = clientQuestions[i];
                    /*
                                        logger.debug(currentDbQuestion.text);
                                        logger.debug(currentClientQuestion.text);
                    */
                    var flag = true;
                    for (var j = 0; j < currentDbQuestion.answers.length; j++) {
                        var dbAnswers = currentDbQuestion.answers[j];
                        var clientAnswers = currentClientQuestion.answers[j];
                        /*
                                                logger.debug("\t"+dbAnswers.text);
                                                logger.debug("\t\t"+dbAnswers.correct);
                                                logger.debug("66666666");
                                                logger.debug("\t"+clientAnswers.text);
                                                logger.debug("\t\t"+clientAnswers.correct);
                        */
                        if (dbAnswers.correct !== clientAnswers.correct) {
                            flag = false;
                        }
                    }
                    if (flag) {
                        score++;
                    }
                }
                logger.debug("Final score " + score);

                // start save user test score in db
                var percentScore = (score * 100) / data[0].questions.length;
                var score = new models.UserScore({
                    username: req.body.email,
                    quiz: data[0].quiz,
                    quizName: data[0].quizName,
                    score: score,
                    percent: percentScore
                });
                score.save(function (err) {
                    if (err) {
                        throw err;
                    }
                    logger.debug("Score saved in db for " + req.body.email);
                });
                // end save user test score in db
                //start finding quizName for quizId data[0].quiz
                /*
                                var queryForQuizNameFromeQuizId = models.Quiz.findOne({"_id":data[0].quiz});
                                queryForQuizNameFromeQuizId.select('name description');
                                queryForQuizNameFromeQuizId.exec(function (err, quiz) {
                                    if (err) throw err;
                                    logger.debug(quiz);
                                    //data[0].quizName = quiz.name;
                                    logger.debug("**************************************************************");
                                    logger.debug(data[0]);
                                    saveTestScore(quiz.name);
                                });
                */
                //end finding quizName for quizId data[0].quiz


                res.json({
                    success: true
                });
                //logger.debug(JSON.stringify(data, null, "\t"))
            })
    })
}