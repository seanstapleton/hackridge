const readlineSync = require('readline-sync');
const {
    getAttendees,
    writeFile
} = require('./utils')

const main = async () => {
    const attendees = await getAttendees();
    const filename = readlineSync.question('Attendees fetched. Where would you like to save them?');
    try {
        await writeFile(filename, JSON.stringify(attendees, null, 2));
    } catch (err) {
        console.log(err.message);
        console.log('Could not save existing attendees. Exiting...')
        process.exit();
    }

    console.log(`Attendees saved in ${filename}`);
    process.exit();
}

main();
