const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@hackridge.zpjgw.mongodb.net/hackridge?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose.connection;
