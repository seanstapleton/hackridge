require('../db');
const mongoose = require('mongoose');
const AttendeeSchema = require('../models/attendee');
const fs = require('fs');

const getAttendees = () => new Promise(
    (resolve, reject) => {
        AttendeeSchema.find({}, {}, {}, (err, docs) => {
            if (err) reject(err);
            else resolve(docs);
        })
});

const writeFile = (filename, data) => new Promise(
    (resolve, reject) => {
        fs.writeFile(filename, data, (err) => {
            if (err) {
                reject(err);
            } else resolve();
        })
    }
);

module.exports = {
    getAttendees,
    writeFile
}
