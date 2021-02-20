const bcrypt = require('bcrypt-nodejs');
const db = require('../../config/db');
const { profile: getProfile } = require('../Query/profile');
const { user: getUser } = require('../Query/user');

const mutations = {
    registerUser: async (_, { data }) => {
        return mutations.newUser(_, {
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            }
        });
    },

    newUser: async (_, { data }, context) => {
        context && context.validateAdmin();

        try {
            const idsProfiles = [];

            // If don't have defined profile, set it as common
            if (!data.profiles || !data.profiles.length) {
                data.profiles = [
                    { name: 'common' }
                ];
            }

            if (data.profiles) {
                for(let profileFilter of data.profiles) {
                    const profile = await getProfile(_, { filter: { ...profileFilter } })

                    if (profile) idsProfiles.push(profile.id);
                }

                // Encrypt password
                const salt = bcrypt.genSaltSync(10/* <-- Rounds */);
                data.password = bcrypt.hashSync(data.password, salt); // Overwrite the password with crypt

                delete data.profiles;

                const [ id ] = await db('users')
                    .insert(data);
                    // .insert({
                    //     name: data.name,
                    //     email: data.email,
                    //     password: data.password
                    // });

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

    removeUser: async (_, { filter }, context) => {
        context && context.validateAdmin();

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
    
    alterUser: async (_, { filter, data }, context) => {
        context && context.validateUserFilter(filter);

        try {
            const user = await getUser(_, { filter });
            if (user) {
                const { id } = user;

                if (context.admin && data.profiles) {
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

                if (data.password) {
                    // Encrypt password
                    const salt = bcrypt.genSaltSync();
                    data.password = bcrypt.hashSync(data.password, salt);
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

module.exports = mutations