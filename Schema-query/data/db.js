const users = [
    {
        id: 1,
        name: 'João Silva',
        email: 'jsilva@gmail.com',
        age: 29,
        profile_id: 1,
        status: 'ACTIVE'
    },
    {
        id: 2,
        name: 'Rafael Junior',
        email: 'rafajun@wemail.com',
        age: 31,
        profile_id: 2,
        status: 'INACTIVE'
    },
    {
        id: 3,
        name: 'Daniela Smith',
        email: 'danismi@umail.com',
        age: 24,
        profile_id: 1,
        status: 'BLOCKED'
    }
];

const profiles = [
    {
        id: 1,
        name: 'Comum'
    },
    {
        id: 2,
        name: 'Administrator'
    }
];

module.exports = { users, profiles }