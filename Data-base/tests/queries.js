const db = require('../config/db');

// db('profiles')
//     // .map(p => p.name)
//     .then(res => res.map(p => p.name))
//     .then(names => console.log(names))
//     .finally(() => db.destroy());
    
// db('profiles')
//     .select('name', 'id')
//         .then(res => console.log(res))
//         .finally(() => db.destroy());

// db.select('name', 'id').from('profiles')
//     .limit(4)
//     .offset(1)
//         .then(res => console.log(res))
//         .finally(() => db.destroy());

db('profiles')
    .select('id', 'name')
    // .where({ id: 2 }) // Where Id it's equals to 2
    // .where("id", "=", 2)
    // .where("name", "like", "%a%")
    // .whereNot({ id: 2 })
    .whereIn('id', [1, 2, 3])
    // .first() // Pick the first element of an Array
        .then(res => console.log(res))
        .finally(() => db.destroy());

console.log('End!');
