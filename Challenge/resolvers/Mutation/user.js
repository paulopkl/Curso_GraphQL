const db = require('../../config/db');
const { profile: getProfile } = require('../Query/profile');
const { user: getUser } = require('../Query/user');

module.exports = {
    newUser: async (_, { data }) => {
        try {
            const idsProfiles = [];

            if (data.profiles) {
                for(let profileFilter of data.profiles) {
                    const profile = await getProfile(_, { filter: { ...profileFilter } })

                    if (profile) idsProfiles.push(profile.id);
                }

                // delete data.profiles;

                const [ id ] = await db('users')
                    // .insert(data);
                    .insert({
                        name: data.name,
                        email: data.email,
                        password: data.password
                    });

                for (let profile_id of idsProfiles) {
                    await db('users_profiles')
                        .insert({ profile_id, user_id: id });
                }

                return db('users')
                    .where({ id })
                    .first();
            }

            if (profile) {
                const { id } = profile;
                await db('users_profiles')
                    .where({ profile_id: id })
                    .delete();
                
                await db('profiles')
                    .where({ id })
                    .delete();
            }

            return profile;
        } catch (err) {
            throw new Error(err.sqlMessage);
        }
    },

    removeUser: async (_, { filter }) => {
        try {
            const user = await getUser(_, { filter });
            if (user) {
                const { id } = user;
                await db('users_profiles') // Delete the user_id where is equals to id in user table
                    .where({ user_id: id })
                    .delete();

                await db('users')
                    .where({ id })
                    .delete();
            }

            return user;
        } catch (err) {
            throw new Error(err.sqlMessage);
        }
    },
    
    alterUser: async (_, { filter, data }) => {
        try {
            const user = await getUser(_, { filter });
            if (user) {
                const { id } = user;

                if (data.profiles) {
                    await db('users_profiles')
                        .where({ user_id: id })
                        .delete();
                        
                    for(let profileFilter of data.profiles) {
                        const profile = await getProfile(_, { filter: profileFilter });

                        if(profile) {
                            await db('users_profiles')
                                .insert({
                                    profile_id: profile.id,
                                    user_id: id
                                });
                        }
                    }
                }

                delete data.profiles;

                await db('users')
                    .where({ id })
                    .update(data)
            }

            return !user ? null : { ...user, ...data };
        } catch (err) {
            throw new Error(err.sqlMessage);
        }
    }
}