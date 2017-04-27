
var models = require('./../models/schema');
//var isLoggedInForRest = require('./util/isLoggedInForRest');

module.exports = function (app, logger) {

    app.post('/contact', function (req, res) {
        logger.debug(req.body);
                var contact = new models.Contact({
                    name: req.body.name,
                    email: req.body.email,
                    subject: req.body.subject,
                    message: req.body.message
                });
                contact.save(function (err) {
                    if (err) {
                        res.json({
                            success: false
                        });
                        throw err;
                    } else{
                        res.json({
                            success: true
                        });
                    }
                    logger.debug("ContactUs message saved in db");
                });
    })
}