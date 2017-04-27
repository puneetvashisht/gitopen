// route middleware to ensure user is logged in
module.exports = function isLoggedInForRest(req, res, next) {
    console.log('Printing session info')
    console.log(req.user);
    console.log(req);
    console.log(req.user);
    if (req.isAuthenticated())
        return next();

    res.json({
        auth: false
    });
}