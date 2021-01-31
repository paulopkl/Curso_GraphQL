const { users, profiles } = require('../data/db');

const resol = {
    ola: () => 'Basta retornar uma String',

    currentHour: () => {
        const date = new Date();
        const hour = date.getHours();
        return date;
    },

    userLogged: This => {
        console.log(This);
        return {
            id: 1,
            name: 'Ana da Web',
            email: 'andadaweb@hotmail.com',
            age: 23,
            salary_real: 1234.56,
            // salary: 6543.21,
            vip: true
        }
    },

    featuredProduct: () => ({
        name: 'Notebook Gamer',
        prize: 4890.89,
        discount: 0.5
    }),

    numbersMegaSena: () => {
        const crescente = (a, b) => a - b;
        return Array(6)
            .fill(0)
            .map(n => parseInt(Math.random() * 60 + 1))
            .sort(crescente);
    },

    users: () => users,

    user: (_, { id }) => {
        const selected = users
            .find(u => u.id === id);
        return selected ? selected : null;
    },

    profiles: () => profiles,

    profile: (_, { id }) => profiles.find(p => p.id === id) ? profiles.find(p => p.id === id) : null
}

module.exports = resol;