var models = require('./../models/schema');

module.exports = function (app, logger) {
    app.get('/polls/polls', function(req, res) {
        // Query Mongo for polls, just get back the question text
        models.Poll.find({}, function(error, polls) {
            res.json(polls);
        });
    });
    app.get('/polls/:id', function(req, res) {
        // Poll ID comes in the URL
		logger.debug("client ip address: "+req.connection.remoteAddress);
			
        var pollId = req.params.id;

        // Find the poll by its ID, use lean as we won't be changing it
        models.Poll.findById(pollId, '', { lean: true }, function(err, poll) {
            if(poll) {
                var userVoted = false,
                    userChoice,
                    totalVotes = 0;

                // Loop through poll choices to determine if user has voted
                // on this poll, and if so, what they selected
				for(c in poll.choices) {
                    var choice = poll.choices[c];

					for(v in choice.votes) {
                        var vote = choice.votes[v];
                        totalVotes++;

						//checking for clientIp here
                        if(vote.ip === (req.headers['x-forwarded-for'] || req.connection.remoteAddress)) {
                            userVoted = true;
                            userChoice = { _id: choice._id, text: choice.text };
                        }
                    }
                }

                // Attach info about user's past voting on this poll
                poll.userVoted = userVoted;
                poll.userChoice = userChoice;

                poll.totalVotes = totalVotes;

                res.json(poll);
            } else {
                res.json({error:true});
            }
        });
    });
    app.post('/polls', function(req, res) {
        logger.debug('in polls post');
        
        var reqBody = req.body,
        // Filter out choices with empty text
            choices = reqBody.choices.filter(function(v) { return v.text != ''; }),
        // Build up poll object to save
            pollObj = {question: reqBody.question, choices: choices};

        logger.debug(choices);
        logger.debug(pollObj);

        // Create poll model from built up poll object
        var poll = new models.Poll(pollObj);

        // Save poll to DB
        poll.save(function(err, doc) {
            if(err || !doc) {
                throw 'Error';
            } else {
                res.json({success:true});
            }
        });
    });


}
