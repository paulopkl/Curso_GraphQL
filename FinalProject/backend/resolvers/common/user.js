const jwt = require('jwt-simple');
const { profiles: getProfiles } = require('../Type/User');

module.exports = {
    getLoggedUser: async user => {
        const profiles = await getProfiles(user);
        const now = Math.floor(Date.now() / 1000);

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            profiles: profiles.map(p => p.name),
            iat: now,
            exp: now + (3 * (24 * (60 * 60)))
        }

        // Generate Payload-user and Token-encrypted
        return { ...payload, token: jwt.encode(payload, process.env.APP_AUTH_SECRET) }
    }
};
