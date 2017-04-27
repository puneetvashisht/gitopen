var User = require('./../../models/user');

let valid = require('./../validity/valid');

module.exports = function (app, logger) {
	
    app.post('/get/all/user/from/mongo', function (req, res) {
		logger.debug(req.body);
		let isValid = JSON.stringify(req.body) === JSON.stringify(valid);
		
		if(isValid){
			User.find({}, function (err, users) {
				logger.debug('finding Users');
				if (err) throw err;
				logger.debug(users);
				let result = [];
				for(let i=0;i<users.length;i++){
					result[i] = users[i].local.email;
				}
				res.json(result);
			});
		}
		else
            res.json({users: true});

    });
	
}