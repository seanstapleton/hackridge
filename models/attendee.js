var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var attendeeSchema = new Schema({
    student_fname: String,
    student_lname: String,
    student_email: String,
    student_age: Number,
    student_grade: String,
    student_school: String,
    student_tshirt: String,
    student_allergies: String,
    student_medical: String,
    contact_fname: String,
    contact_lname: String,
    contact_relation: String,
    contact_email: String,
    contact_phnum: String,
    form_agreement: Boolean
});

module.exports = mongoose.model('Attendee', attendeeSchema);
