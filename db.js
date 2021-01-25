var mongoose = require('mongoose');

var url = `mongodb://${process.env.db_user}:${process.env.db_pass}@hackridge-shard-00-00.zpjgw.mongodb.net:27017,hackridge-shard-00-01.zpjgw.mongodb.net:27017,hackridge-shard-00-02.zpjgw.mongodb.net:27017/hackridge?ssl=true&replicaSet=atlas-1xhxy3-shard-0&authSource=admin&retryWrites=true&w=majority`;
mongoose.connect(url);

module.exports = mongoose.connection;
