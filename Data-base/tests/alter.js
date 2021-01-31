const db = require('../config/db');

const newUser = {
    name: "Paulo",
    email: "paulo@bussiness.com.br",
    password: "123456"
}

const exercice = async () => {
    // count
    const { quantity } = await db('users')
        .count('* as quantity')
        .first()
    
    // insert (if the table was empty)
    if (quantity === 0) {
        await db('users')
            .insert(newUser);
    }

    // query
    let { id } = await db('users')
        .select('id')
        .limit(1)
        .first();

    // alter
    await db('users')
        .where({ id })
        .update({ 
            name: 'Paulo Richard',
            email: 'paulo.richard@bussiness.com.br'
        });

    return await db('users')
        .where({ id });
}

exercice()
    .then(user => console.log(user))
    .finally(() => db.destroy());