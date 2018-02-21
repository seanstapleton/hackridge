var mongoose = require('mongoose');

var url = 'mongodb://'+process.env.db_user+':'+process.env.db_pass+'@ds239988.mlab.com:39988/mainemadness';
mongoose.connect(url);

module.exports = mongoose.connection;
