// config/auth.js

// expose our config directly to our application using module.exports
/*
module.exports = {

    'facebookAuth' : {
        'clientID'        : '986298078117792', // your App ID
        'clientSecret'    : 'e9ab37432a36e6a1757d46a970503d04', // your App Secret
        'callbackURL'     : 'http://localhost:3000/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here',
        'consumerSecret'     : 'your-client-secret-here',
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '670968068043-v2nclvjl3acemo2l8vq96tucam11ekck.apps.googleusercontent.com',
        'clientSecret'     : 'wajE1Wnt1I7LUFXlAuKG8n5u',
        'callbackURL'      : 'http://localhost:3000/oauth2callback'
    }

};
*/


module.exports = {

    'facebookAuth' : {
        'clientID'        : '986298078117792', // your App ID
        'clientSecret'    : 'e9ab37432a36e6a1757d46a970503d04', // your App Secret
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here',
        'consumerSecret'     : 'your-client-secret-here',
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '670968068043-v2nclvjl3acemo2l8vq96tucam11ekck.apps.googleusercontent.com',
        'clientSecret'     : 'wajE1Wnt1I7LUFXlAuKG8n5u',
        'callbackURL'      : '/auth/google/callback'
    }

};


