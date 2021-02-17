const db = require('../../config/db');

module.exports = {
    profiles: (obj, args, ctx) => {
        
        return db('profiles');
    },

    profile: async (_, { filter }) => {
        if (!filter) return null;
        const { id, name } = filter;

        let profile = id 
            ? await db('profiles').where({ id }).first() 
            : name ? await db('profiles').where({ name }).first() : null;

        return profile;
    }
}