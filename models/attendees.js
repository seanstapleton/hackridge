var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var attendeesSchema = new Schema({
    data: Object
});

module.exports = mongoose.model('Attendee', attendeesSchema);
