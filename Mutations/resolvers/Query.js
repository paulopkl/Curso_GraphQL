const { users, profiles } = require('../data/db');

const UserIndex = filter => {
    if (!filter) return -1;
    const { id, email } = filter;

    if (id) return users.findIndex(u => u.id === id);
    else if (email) return users.findIndex(u => u.email === email);

    return -1;
}

const resol = {
    numbersMegaSena: () => {
        const crescente = (a, b) => a - b;
        return Array(6)
            .fill(0)
            .map(n => parseInt(Math.random() * 60 + 1))
            .sort(crescente);
    },

    users: () => users,

    user: (_, { filter }) => {
        // const selected = users
        //     .find(u => u.id === id);
        // return selected ? selected : null;

        const selected = UserIndex(filter);
        if (selected < 0) return null;
        return users[selected];
    },

    profiles: () => profiles,

    profile: (_, { id }) => profiles.find(p => p.id === id) ? profiles.find(p => p.id === id) : null
}

module.exports = resol;