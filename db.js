var mongoose = require('mongoose');

var url = 'mongodb://'+process.env.db_user+':'+process.env.db_pass+'@ds213715.mlab.com:13715/hackridge';
mongoose.connect(url);

module.exports = mongoose.connection;
