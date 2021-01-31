const db = require('../config/db');

const saveUser = async (name, email, password) => {
    let user = await db('users')
        .where({ email })
        .first()

    if (!user) {
        let [ id ] = await db('users')
            .insert({ name, email, password });

        user = await db('users')
            .where({ id })
            .first();
    } else {
        await db('users')
            .where({ id: user.id })
            .update({ name, email, password });
        
        user = { ...user, name, email, password };
    }

    return user;
}

const saveProfile = async (name, label) => {
    let profile = await db('profiles')
        .where({ name })
        .first();

    if (!profile) {
        let [ id ] = await db('profiles')
            .insert({ name, label });

        profile = await db('profiles')
            .where({ id })
            .first();
    } else {
        await db('profiles')
            .where({ id: profile.id })
            .update({ name, label });

        profile = { ...profile, name, label };
    }
    
    return profile;
}

const addProfiles = async (user, ...profiles) => {
    const user_id = user.id;
    await db('users_profiles')
    .where({ user_id })
    .delete();
    
    for(profile of profiles) {
        const profile_id = profile.id;
        await db('users_profiles')
            .insert({ user_id, profile_id });
    }
}

const exec = async () => {
    const user = await saveUser('Ana Silva', 'ana.silva@bussiness.com.br', '123456');
    const profileA = await saveProfile('rh_1', 'Personal');
    const profileB = await saveProfile('fin_1', 'Financial');

    console.log(user);
    console.log(profileA);
    console.log(profileB);

    await addProfiles(user, profileA, profileB);
}

exec()
    .catch(err => console.log(err))
    .finally(() => db.destroy());