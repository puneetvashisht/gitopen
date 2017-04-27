let mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://127.0.0.1:27017/';

module.exports = {
//    'secret': 'puneetvashisht',
    'url' : mongodb_connection_string
};
