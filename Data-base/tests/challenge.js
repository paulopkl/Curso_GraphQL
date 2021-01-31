const db = require('../config/db');

const saveUser = async (name, email, password) => await db('users').insert({ name, email, password });

const saveProfile = async (name, label) => await db('profiles').insert({ name, label });

const addProfiles = async (user, ...profiles) => {
    // for(profile of profiles) {...}
}

const exec = async () => {
    const user = await saveUser('Ana', 'ana@bussiness.com.br', '123456');
    const profileA = await saveProfile('rh', 'Personal');
    const profileB = await saveProfile('fin', 'Financial');

    console.log(user);
    console.log(profileA);
    console.log(profileB);

    await addProfiles(user, profileA, profileB);
}

exec()
    .catch(err => console.log(err))
    .finally(() => db.destroy());