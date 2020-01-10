require('../db')
const mongoose = require('mongoose')
const AttendeeSchema = require('../models/attendee')
const readlineSync = require('readline-sync');
const {
    getAttendees,
    writeFile
} = require('./utils')

const clearCollection = () => new Promise(
    (resolve, reject) => {
        AttendeeSchema.remove({}, (err) => {
            if (err) reject(err);
            else resolve();

        });
    }
);

const main = async () => {
    const attendees = await getAttendees();
    console.log('Saving existing attendees in attendees.json');
    try {
        await writeFile('attendees.json', JSON.stringify(attendees, null, 2));
    } catch (err) {
        console.log(err.message);
        console.log('Could not save existing attendees. Exiting...')
        process.exit();
    }

    const areYouSure = readlineSync.question('Are you sure you would like to clear the attendees collection? Make sure you have a backup. This cannot be undone! (y/n)');
    if (areYouSure == 'y') {
        try {
            await clearCollection();
            console.log('Attendees cleared.');
        } catch {
            console.log('Could not clear attendees');
        }
        process.exit();
    } else {
        process.exit();
    }
}

main();
