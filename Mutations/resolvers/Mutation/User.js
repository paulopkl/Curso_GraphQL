const { users, nextId } = require('../../data/db');

const UserIndex = filter => {
    if (!filter) return -1;
    const { id, email } = filter;

    if (id) return users.findIndex(u => u.id === id);
    else if (email) return users.findIndex(u => u.email === email);
    else if (age) return users.findIndex(u => u.age === age);
    else if (name) return users.findIndex(u => u.name === name);

    return -1;
}

module.exports = {
    newUser: (_, { data }) => {
        const existingEmail = users
            .some(u => u.email === data.email);

        if (existingEmail) {
            throw new Error('E-mail registered!')
        }

        const nw = {
            id: nextId(),
            ...data,
            profile_id: 1,
            status: 'ACTIVE'
        }

        users.push(nw);
        return nw;
    },

    deleteUser: (_, { filter }) => {
        const i = UserIndex(filter);

        if (i < 0) return null;
        const excluded = users.splice(i, 1);
        return excluded ? excluded[0] : null;
    },

    alterUser: (_, { filter, data }) => {
        const i = UserIndex(filter);

        if (i < 0) return null;

        users[i].name = data.name;
        users[i].email = data.email;
        if (data.age) { users[i].age = data.age; }
        
        return users[i];

        // const user = {
        //     ...users[i],
        //     ...filter
        // }

        // users.splice(i, 1, user);
        // return user;
    }
};