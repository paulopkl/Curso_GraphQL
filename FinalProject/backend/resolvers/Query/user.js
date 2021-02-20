const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');
const { getLoggedUser } = require('../common/user');

module.exports = {
    login: async (_, { data }) => {
        const user = await db('users')
            .where({ email: data.email })
            .first();

        if (!user) throw new Error('Invalid User/Password!');

        const areEquals = bcrypt.compareSync(data.password, user.password);

        if (!areEquals) throw new Error('Invalid User/Password!');

        return getLoggedUser(user);
    },

    users: async (parent, args, context) => {
        console.log(context);
        context && context.validateAdmin();

        let users = await db('users').catch(err => console.error(err));

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

    user: async (_, { filter }, context) => {
        context && context.validateUserFilter(filter);

        if (!filter) return null;
        
        const { id, email } = filter;
        
        return id 
            ? db('users').where({ id }).first() 
            : email 
                ? db('users').where({ email }).first() 
                : null;
    },
}