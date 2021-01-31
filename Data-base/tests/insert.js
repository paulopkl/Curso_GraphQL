const knex = require('../config/db');

const newProfile = {
    name: 'register',
    label: 'Register'
}

knex('profiles')
    .insert(newProfile)
    .then(res => console.log(res))