const db = require('./db');
const { getLoggedUser } = require('../resolvers/common/user');

const sql = `
    SELECT
        u.*
    FROM
        users u,
        users_profiles up,
        profiles p
    WHERE
        up.user_id = u.id
        AND up.profile_id = p.id
        AND u.active = 1
        AND p.name = :variable
    LIMIT 1
`;

const getUser = async profileName => {
    const res = await db.raw(sql, { variable: profileName });
    // console.log(res);
    return res ? res[0][0] : null; // Primary value of the primary array or Null
}

module.exports = async req => {
    // const user = await getUser('common');

    if (user) {
        const { token } = await getLoggedUser(user);
        req.headers.authorization = `Bearer ${token}`;
    }
};