let id = 1;
const nextId = () => id++;

const users = [
    {
        id: nextId(),
        name: 'João Silva',
        email: 'jsilva@gmail.com',
        age: 29,
        profile_id: 1,
        status: 'ACTIVE'
    },
    {
        id: nextId(),
        name: 'Rafael Junior',
        email: 'rafajun@wemail.com',
        age: 31,
        profile_id: 2,
        status: 'INACTIVE'
    },
    {
        id: nextId(),
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

module.exports = { users, profiles, nextId }