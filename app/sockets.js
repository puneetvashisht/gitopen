var models = require('./models/schema');

module.exports = function (io, logger) {
	io.on('connection', (socket) => {
		logger.debug('user connected');
	
		socket.on('disconnect', function () {
			logger.debug('user disconnected');
		});
	
		socket.on('send:vote', function (data) {
			logger.debug("in send:vote");
			var clientIp = socket.handshake.address;
	
			models.Poll.findById(data.poll_id, function (err, poll) {
				var choice = poll.choices.id(data.choice);
				choice.votes.push({
					ip: clientIp
				});
	
				poll.save(function (err, doc) {
					var theDoc = {
						question: doc.question,
						_id: doc._id,
						choices: doc.choices,
						userVoted: false,
						totalVotes: 0
					};
	
					// Loop through poll choices to determine if user has voted
					// on this poll, and if so, what they selected
					for (var i = 0, ln = doc.choices.length; i < ln; i++) {
						var choice = doc.choices[i];
	
						for (var j = 0, jLn = choice.votes.length; j < jLn; j++) {
							var vote = choice.votes[j];
							theDoc.totalVotes++;
							theDoc.ip = clientIp;
	
							if (vote.ip === clientIp) {
								theDoc.userVoted = true;
								theDoc.userChoice = {
									_id: choice._id,
									text: choice.text
								};
							}
						}
					}
	
					io.emit('vote', theDoc);
				});
			});
		});
	});
}