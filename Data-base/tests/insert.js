const db = require('../config/db');
const knex = require('../config/db');

// const newProfile = {
//     name: 'stranger',
//     label: 'Stranger'
// }

// knex('profiles')
//     .insert(newProfile)
//         .then(res => console.log(res))
//         .catch(err => console.error(err.sqlMessage))
//         .finally(() => db.destroy());

const profileRT = {
    name: 'root' + Math.random(),
    label: "Super User chmod+777"
}

// INSERT INTO profiles (name, label) VALUES ("...", "...")
db.insert(profileRT).into('profiles')
    .then(res => res[0])
    .then(id => `The generated Id was ${id}`)
    .then(string => console.log(string))
    .catch(err => console.error(err.sqlMessage))
    .finally(() => db.destroy());