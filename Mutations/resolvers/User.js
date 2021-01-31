const { profiles } = require('../data/db');

module.exports = {
    salary(This) {
        return This.salary_real;
    },
    
    profile(This) {
        return profiles.find(p => p.id === This.profile_id) 
            ? profiles.find(p => p.id === This.profile_id) 
            : null;
    }
};