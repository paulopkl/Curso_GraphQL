const db = require('../config/db');

// Remove for Id
// db('users')
//     .where({ id: 1 })
//     .delete()
//         .then(res => console.log(res))
//         .finally(() => db.destroy());

// created_at
// updated_at
// deleted_at

db('users')
    .delete()
        .then(res => console.log(res))
        .finally(() => db.destroy());