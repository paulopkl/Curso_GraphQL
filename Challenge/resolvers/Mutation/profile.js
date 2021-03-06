const db = require('../../config/db');
const { profile: getProfile } = require('../Query/profile');

module.exports = {
    newProfile: async (_, { data }) => {
        try {
            const [ id ] = await db('profiles')
                .insert(data);
            
            return db('profiles')
                .where({ id })
                .first();
        } catch (err) {
            throw new Error(err.sqlMessage);
        }
    },
    
    removeProfile: async (_, args) => {
        try {
            const profile = await getProfile(_, args);

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
    
    alterProfile: async (_, { filter, data }) => {
        try {
            const profile = await getProfile(_, { filter });

            if (profile) {
                const { id } = profile;
                await db('profiles')
                    .where({ id })
                    .update({ ...data });
            }

            return { ...profile, ...data };
        } catch (err) {
            throw new Error(err.sqlMessage);
        }
    }
}