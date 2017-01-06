var mongoose = require('mongoose');

var url = 'mongodb://'+process.env.db_user+':'+process.env.db_pass+'@ds155718.mlab.com:55718/hackridge';
mongoose.connect(url);

module.exports = mongoose.connection;
