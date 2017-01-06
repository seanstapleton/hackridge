var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var attendeesSchema = new Schema({
    email: String
});

module.exports = mongoose.model('Attendee', attendeesSchema);
