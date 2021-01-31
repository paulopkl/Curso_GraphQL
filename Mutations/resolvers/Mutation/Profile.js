const { profiles, nextId } = require('../../data/db');

const ProfileIndex = filter => {
    if (!filter) return -1;
    const { id, name } = filter;

    if (id) return profiles.findIndex(p => p.id === id);
    else if (name) return profiles.findIndex(p => p.name === name);
    else return -1;
}

module.exports = {
    newProfile: (_, { data }) => {
        const existingProfile = profiles
            .some(p => p.name === data.name);

        if (existingProfile) {
            throw new Error('Profile already registered!');
        }

        const newP = {
            id: nextId(),
            ...data,
        }

        profiles.push(newP);
        return newP;
    },

    deleteProfile: (_, { filter }) => {
        const i = ProfileIndex(filter);

        if (i < 0) return null;
        const excluded = profiles.splice(i, 1);
        return excluded ? excluded[0] : null;
    },

    alterProfile: (_, { filter, data }) => {
        const i = ProfileIndex(filter);

        if (i < 0) return null;

        profiles[i].name = data.name;
        
        return profiles[i];
    }
};
