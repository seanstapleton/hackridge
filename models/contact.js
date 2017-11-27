var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    fname: String,
    lname: String,
    email: String,
    message: String,
    datetime: String
});

module.exports = mongoose.model('Contact', contactSchema);
