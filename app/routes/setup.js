var models = require('./../models/schema');
var fs = require('fs');

module.exports = function (app, logger) {

    //Quiz HTML, JAVA.
    // user tkhts@gmail.com
    app.get('/setupQuiz2', function (req, res) {

        var quiz1 = new models.Quiz({
            _id: 9,
            name: 'HTML',
            description: 'HtmlQuiz',
            showScores: true
        });
        var quiz2 = new models.Quiz({
            _id: 10,
            name: 'Java',
            description: 'Java Quiz',
            showScores: false
        });

        quiz1.save(function (err) {
            if (err) throw err;
            logger.info('Html Quiz saved')

        })
        quiz2.save(function (err) {
            if (err) throw err;
            logger.info('Java Quiz saved')

        })

        var userquiz1 = new models.UserQuiz({
            user: 'tkhts@gmail.com',
            quiz: quiz1._id,
            quizName: quiz1.name,
			description: quiz1.description
        })
        var userquiz2 = new models.UserQuiz({
            user: 'tkhts@gmail.com',
            quiz: quiz2._id,
            quizName: quiz2.name,
			description: quiz2.description
        })

        userquiz1.save(function (err) {
            if (err) throw err;
            logger.info('Only user-quiz Relationship saved not quiz-questions')
        })
        userquiz2.save(function (err) {
            if (err) throw err;
            logger.info('Only user-quiz Relationship saved not quiz-questions')
        })


        var answers11 = new models.Answer({
            text: 'correct answer',
            correct: true
        })
        var answers12 = new models.Answer({
            text: 'incorrect answer',
            correct: false
        })
        var answers13 = new models.Answer({
            text: 'True',
            correct: true
        })
        var answers14 = new models.Answer({
            text: 'incorrect answer',
            correct: false
        })

        var answers21 = new models.Answer({
            text: 'incorrect answer',
            correct: false
        })
        var answers22 = new models.Answer({
            text: 'True',
            correct: true
        })
        var answers23 = new models.Answer({
            text: 'correct answer',
            correct: true
        })
        var answers24 = new models.Answer({
            text: 'incorrect answer',
            correct: false
        })

        var question11 = new models.Question({
            _id: 1,
            text: 'Find the correct answer',
            answers: [answers11, answers12, answers13, answers14]
        })

        var question12 = new models.Question({
            _id: 2,
            text: 'Find the correct answer again',
            answers: [answers21, answers22, answers23, answers24]
        })


        var quizQuestion1 = new models.QuizQuestion({
            quiz: quiz1._id,
            quizName: quiz1.name,
            questions: [question11, question12],
            tl: 300
        })

        quizQuestion1.save(function (err) {
            if (err) throw err;
            logger.info('Quiz Question saved')
        })


        var answers21 = new models.Answer({
            text: 'True',
            correct: true
        })
        var answers22 = new models.Answer({
            text: 'False',
            correct: false
        })

        var answers23 = new models.Answer({
            text: 'False',
            correct: false
        })
        var answers24 = new models.Answer({
            text: 'True',
            correct: true
        })

        var question21 = new models.Question({
            _id: 3,
            text: 'Java is platform independent language.',
            answers: [answers21, answers22]
        })

        var question22 = new models.Question({
            _id: 4,
            text: 'Java main method is entry point to start java program.',
            answers: [answers23, answers24]
        })

        var quizQuestion2 = new models.QuizQuestion({
            quiz: quiz2._id,
            quizName: quiz2.name,
            questions: [question21, question22],
            tl: 300
        })

        quizQuestion2.save(function (err) {
            if (err) throw err;
            logger.info('Quiz Question saved')
        })
        res.json({
            success: true
        });
    });

    //Quiz AngularJS, ReactJS.
    // user puneetvashisht@gmail.com
    app.get('/setupQuiz', function (req, res) {

        var quiz1 = new models.Quiz({
            _id: 4,
            name: 'AngularJS',
            description: 'AngularJSQuiz',
            showScores: false
        });
        var quiz2 = new models.Quiz({
            _id: 5,
            name: 'ReactJS',
            description: 'React JS Quiz',
            showScores: true
        });

        quiz1.save(function (err) {
            if (err) throw err;
            logger.info('Quiz saved')
        })
        quiz2.save(function (err) {
            if (err) throw err;
            logger.info('Quiz saved')
        })

        var userquiz1 = new models.UserQuiz({
            user: 'puneetvashisht@gmail.com',
            quiz: quiz1._id,
            quizName: quiz1.name,
			description: quiz1.description
        })
        var userquiz2 = new models.UserQuiz({
            user: 'puneetvashisht@gmail.com',
            quiz: quiz2._id,
            quizName: quiz2.name,
			description: quiz2.description
        })

        userquiz1.save(function (err) {
            if (err) throw err;
            logger.info('Only user-quiz Relationship saved not quiz-questions')
        })
        userquiz2.save(function (err) {
            if (err) throw err;
            logger.info('Only user-quiz Relationship saved not quiz-questions')
        })


        var answers11 = new models.Answer({
            text: 'correct answer',
            correct: true
        })
        var answers12 = new models.Answer({
            text: 'incorrect answer',
            correct: false
        })
        var answers13 = new models.Answer({
            text: 'incorrect answer',
            correct: false
        })
        var answers14 = new models.Answer({
            text: 'incorrect answer',
            correct: false
        })

        var question11 = new models.Question({
            _id: 5,
            text: 'Find the correct answer again',
            answers: [answers11, answers12, answers13, answers14]
        })

        var answers21 = new models.Answer({
            text: 'incorrect answer',
            correct: false
        })
        var answers22 = new models.Answer({
            text: 'incorrect answer',
            correct: false
        })
        var answers23 = new models.Answer({
            text: 'correct answer',
            correct: true
        })
        var answers24 = new models.Answer({
            text: 'incorrect answer',
            correct: false
        })

        var question12 = new models.Question({
            _id: 6,
            text: 'Find the correct answer',
            answers: [answers21, answers22, answers23, answers24]
        })

        var quizQuestion1 = new models.QuizQuestion({
            quiz: quiz1._id,
            quizName: quiz1.name,
            questions: [question11, question12],
            tl: 15
        })
        quizQuestion1.save(function (err) {
            if (err) throw err;
            logger.info('QuizQuestion1 saved')
        })

        var answers21 = new models.Answer({
            text: 'True',
            correct: true
        })
        var answers22 = new models.Answer({
            text: 'False',
            correct: false
        })
        var question21 = new models.Question({
            _id: 7,
            text: 'Is React JS from facebook?',
            answers: [answers21, answers22]
        })

        var answers23 = new models.Answer({
            text: 'DOM meriging',
            correct: true
        })
        var answers24 = new models.Answer({
            text: 'DOM manipulation',
            correct: false
        })
        var question22 = new models.Question({
            _id: 8,
            text: 'ReactJS works using',
            answers: [answers23, answers24]
        })


        var quizQuestion2 = new models.QuizQuestion({
            quiz: quiz2._id,
            quizName: quiz2.name,
            questions: [question21, question22],
            tl: 300
        })

        quizQuestion2.save(function (err) {
            if (err) throw err;
            logger.info('QuizQuestion2 saved')
        })
        res.json({
            success: true
        });
    });

    // delete all quizzes from database
    app.post('/setupRemoveAllQuiz', function (req, res) {
        var result = {};
        models.QuizQuestion.find({}, function (err, quizQuestions) {
            if (err) {
                logger.debug('Error while finding quizQuestons');
                result.message = 'Error while finding quizQuestons';
            } else {
                if (quizQuestions.length > 0) {
                    quizQuestions.forEach(function (quizQuestion) {
                        models.UserQuiz.findOneAndRemove({"quiz": quizQuestion.quiz}, function (err) {
                            if (err) throw err;
                            logger.info("UserQuiz removed")
                            result.UserQuiz = {removed: true};
                        });
                        models.Quiz.findOneAndRemove({"_id": quizQuestion.quiz}, function (err) {
                            if (err) throw err;
                            logger.info("Quiz removed")
                            result.Quiz = {removed: true};
                        });
                        models.QuizQuestion.findOneAndRemove({"quiz": quizQuestion.quiz}, function (err) {
                            if (err) throw err;
                            logger.info("QuizQuestion removed")
                            result.QuizQuestion = {removed: true};
                        });
                    });
                }
                else {
                    result.message = 'QuizQuestions database is already empty';
                    logger.info("No QuizQuestions in database");
                }
            }
            res.json({
                success: true,
                result: result
            });
        })
    });

    app.post('/setupQuizFile/:quiz_name', function (req, res) {

        fs.readFile('./app/routes/quiz_setup/'+req.params.quiz_name+'_setup.json', function (err, result) {
            if (err) throw err;

            var data = JSON.parse(result);

            var quiz = new models.Quiz({
                _id: data.quiz._id,
                name: data.quiz.name,
                description: data.quiz.description,
                showScores: data.quiz.showScores
            });

            quiz.save(function (err) {
                if (err) throw err;
                logger.debug(data.quiz.name + ' Quiz saved')
            });


            var questions = [];
            data.questions.forEach(function (que) {
                var answers = [];
                que.answers.forEach(function (ans) {
                    var answer = new models.Answer({
                        text: ans.text,
                        correct: ans.correct
                    });
                    answers.push(answer);
                });
                var question = new models.Question({
                    text: que.text,
                    answers: answers
                });
                questions.push(question);
            })


            var quizQuestion = new models.QuizQuestion({
                quiz: data.quiz._id,
                quizName: data.quiz.name,
                questions: questions,
                tl: data.time_limit
            })

            quizQuestion.save(function (err) {
                if (err) throw err;
                logger.info(data.quiz.name+' Question saved')
            })
            res.json({
                success: true
            });
        });
    });

    app.post('/setupUserQuizFile/:quiz_name', function (req, res) {
        fs.readFile('./app/routes/quiz_setup/'+req.params.quiz_name+'_setup.json', function (err, result) {
            if (err) throw err;
            var data = JSON.parse(result);
            data.users.forEach(function (user) {
                var userquiz = new models.UserQuiz({
                    user: user,
                    quiz: data.quiz._id,
                    quizName: data.quiz.name,
                    description: data.quiz.description
                });
                userquiz.save(function (err) {
                    if (err) throw err;
                    logger.info('Only user-quiz Relationship saved.');
                    logger.info("user : "+user);
                    logger.info("Quiz : "+data.quiz.name);
                });
            });

            res.json({
                success: true
            });
        });
    });

    app.post('/setupQuiz', function (req, res) {

		var data = req.body;

		var quiz = new models.Quiz({
			_id: data.quiz._id,
			name: data.quiz.name,
			description: data.quiz.description,
			showScores: data.quiz.showScores
		});

		quiz.save(function (err) {
			if (err) throw err;
			logger.debug(data.quiz.name + ' Quiz saved')
		});

		var questions = [];
		data.questions.forEach(function (que) {
			var answers = [];
			que.answers.forEach(function (ans) {
				var answer = new models.Answer({
					text: ans.text,
					correct: ans.correct
				});
				answers.push(answer);
			});
			var question = new models.Question({
				text: que.text,
				answers: answers
			});
			questions.push(question);
		})

		var quizQuestion = new models.QuizQuestion({
			quiz: data.quiz._id,
			quizName: data.quiz.name,
			questions: questions,
			tl: data.time_limit
		})

		quizQuestion.save(function (err) {
			if (err) throw err;
			logger.info(data.quiz.name+' Question saved')
		})
		res.json({
			success: true
		});
        
    });
	
    app.post('/setupUserQuiz', function (req, res) {
            var data = req.body;
			if(data.users.length <= 0){
				res.json({success: false, message: "no users"});
			}
            data.users.forEach(function (user) {
                var userquiz = new models.UserQuiz({
                    user: user,
                    quiz: data.quiz._id,
                    quizName: data.quiz.name,
                    description: data.quiz.description
                });
                userquiz.save(function (err) {
                    if (err) throw err;
                    logger.info('Only user-quiz Relationship saved.');
                    logger.info("user : "+user);
                    logger.info("Quiz : "+data.quiz.name);
                });
            });

            res.json({success: true});
    });

    app.get('/setupAngularVideos', function (req, res) {
        var video1Section1 = new models.VideoSection({
            name: 'Introduction',
            videos: [{
                title: 'AngularJS intro 1',
                url: './videoLibrary/AngularJS/video1.mp4'
            }, {
                title: 'AngularJS intro 2',
                url: './videoLibrary/AngularJS/video2.mp4'
            }]
        });

        var video1Section2 = new models.VideoSection({
            name: 'Basic',
            videos: [{
                title: 'AngularJS basic 1',
                url: './videoLibrary/AngularJS/video3.mp4'
            }]
        });

        var AngularVdo = new models.Video({
            title: 'AngularJS',
            sections: [video1Section1, video1Section2]
        });

        AngularVdo.save(function (err) {
            if (err) throw err;
            logger.debug('AngularVdo saved');
        });

        res.json({
            success: true
        });
    });

    app.get('/setupCoreJavaVideos', function (req, res) {
        var video1Section1 = new models.VideoSection({
            name: 'Introduction',
            videos: [{
                title: 'CoreJava intro 1',
                url: './videoLibrary/CoreJava/video1.mp4'
            }, {
                title: 'CoreJava intro 2',
                url: './videoLibrary/CoreJava/video2.mp4'
            }]
        });

        var video1Section2 = new models.VideoSection({
            name: 'Basic',
            videos: [{
                title: 'CoreJava basic 1',
                url: './videoLibrary/CoreJava/video3.mp4'
            }]
        });

        var CoreJavaVdo = new models.Video({
            title: 'CoreJava',
            sections: [video1Section1, video1Section2]
        });

        CoreJavaVdo.save(function (err) {
            if (err) throw err;
            logger.debug('CoreJavaVdo saved');
        });

        res.json({
            success: true
        });
    });

    app.get('/setupAdvancedJavaVideos', function (req, res) {
        var video1Section1 = new models.VideoSection({
            name: 'Introduction',
            videos: [{
                title: 'AdvancedJava intro 1',
                url: './videoLibrary/AdvancedJava/video1.mp4'
            }, {
                title: 'AdvancedJava intro 2',
                url: './videoLibrary/AdvancedJava/video2.mp4'
            }]
        });

        var video1Section2 = new models.VideoSection({
            name: 'Basic',
            videos: [{
                title: 'AdvancedJava basic 1',
                url: './videoLibrary/AdvancedJava/video3.mp4'
            }]
        });

        var CoreJavaVdo = new models.Video({
            title: 'AdvancedJava',
            sections: [video1Section1, video1Section2]
        });

        CoreJavaVdo.save(function (err) {
            if (err) throw err;
            logger.debug('AdvancedJavaVdo saved');
        });

        res.json({
            success: true
        });
    });
    
}