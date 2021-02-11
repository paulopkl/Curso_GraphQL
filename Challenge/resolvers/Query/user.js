const db = require('../../config/db');

module.exports = {
    users: async () => {
        let users = await db('users')
            .catch(err => console.error(err));

        // for(user of users) {
        //     user.profiles = [];
        //     let users_profiles = await db('users_profiles').where({ user_id: user.id });
        //     // console.log(users_profiles);
        //     users_profiles.forEach(async profile => {
        //         let [ perf ] = await db('profiles').where({ id: profile.profile_id });
        //         user.profiles.push(perf);
        //         console.log(user);
        //         return user
        //     })
        // }
        // let profiles = await db('profiles');
        // console.log(profiles);
        // console.log(users_profiles);
        // console.log(users);
        return users;
    },

    user: async (_, { filter }) => {
        if (!filter) return null;
        
        const { id, email } = filter;
        
        return id 
            ? db('users').where({ id }).first() 
            : email 
                ? db('users').where({ email }).first() 
                : null;
    },
}