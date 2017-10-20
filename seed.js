const db = require('./db');
const Student = require('./db/models').Student;
const Campus = require('./db/models').Campus;

db.sync({ force: true })
    .then(() => {
        console.log('Seeding database')
        return Campus.bulkCreate([{
            name: 'Atlanta Falcons',
            image: 'https://yt3.ggpht.com/-aDTL1qwZs1Y/AAAAAAAAAAI/AAAAAAAAAAA/P-6SJEy3_us/s900-c-k-no-mo-rj-c0xffffff/photo.jpg'
        }, {
            name: 'New York Giants',
            image: 'https://pbs.twimg.com/profile_images/905506936363339781/FwLc7lol_400x400.jpg'
        }, {
            name: 'Miami Dolphins',
            image: 'http://myhrpartnerinc.com/wp-content/uploads/2013/11/Dolphins_Helmet.jpg'
        }])
    })
    .then(() => {
        return Student.bulkCreate([{
            name: 'Odell Beckham Junior',
            email: 'eli@bigblue.com',
            campusId: 2
        }, {
            name: 'Eli Manning',
            email: 'eli@bigblue.com',
            campusId: 2
        }, {
            name: 'Jarvis Landy',
            email: 'jarvis@miadolpins.com',
            campusId: 3
        }, {
            name: 'Jay Ajayi',
            email: 'jay@miadolphins.com',
            campusId: 2
        }, {
            name: 'Julio Jones',
            email: 'julio@atlfalcons.com',
            campusId: 1
        }, {
            name: 'Matt Ryan',
            email: 'matty-ice@atlfalcons.com',
            campusId: 1
        }])
    })
    .then(() => {
        console.log('database seeded')
        db.close();
        return null;
    })