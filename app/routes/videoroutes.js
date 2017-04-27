/*
var log4js = require('log4js');
log4js.configure('log4js/config.json', { reloadSecs: 1000 });

var logger = log4js.getLogger('VideoRoutesLogger');
logger.setLevel('trace');
*/


var models = require('./../models/schema');
var socketRoute = require('./sockets.js');
//var isLoggedInForRest = require('./util/isLoggedInForRest');

module.exports = function (app, passport, logger){

    // app.post('/video', socketRoute.socketApp);


    app.get('/getVideos/:subject', function (req, res) {
//    app.get('/getVideos/:subject', isLoggedInForRest, function (req, res) {

                logger.debug(req.params.subject);

        logger.debug(req.originalUrl);
        // Read abc.mp4 using fs
        // Write data to response
        models.Video.find({"title": req.params.subject}).exec(function (err, data) {
            if (err) throw err;
            logger.debug('Printing Data ++++++++++++');
            logger.debug(data);
            // logger.debug(data[0].sections);
/*            var videos = {};
            videos.title = data[0].title;
            var videosSections = [];
            data[0].sections.forEach(function (section) {
                logger.debug(section)
                section.name;
                section.video;
            })*/
        res.json({success: true, sections: data[0].sections});
        // res.json({success: true});
        })
        //logger.debug(JSON.stringify(data, null, "\t"))
    })
    
}