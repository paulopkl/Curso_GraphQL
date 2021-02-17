const config = require('../knexfile.js');
let knex = require('knex');
knex = knex(config);
knex.raw("SELECT 'test connection';")
  .then(msg => { // Success / boot rest of app
    console.log("Connection Successfully!");
  }).catch(err => { // Failure / timeout
    console.log("Connection Error With database!");
    throw err;
  });
  
module.exports = knex;