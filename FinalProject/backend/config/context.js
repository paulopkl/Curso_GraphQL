const jwt = require('jwt-simple');

module.exports = async ({ req }) => {

    // await require('./simulateLoggedUser')(req);
    
    const auth = req.headers.authorization;
    const tokenOnly = auth && auth.substring(7);
    
    // console.log(auth);

    let user = null, admin = false;

    if (tokenOnly) {
        try {
            let tokenContent = jwt.decode(tokenOnly, process.env.APP_AUTH_SECRET);

            if (new Date(tokenContent.exp * 1000) > new Date()) user = tokenContent;
        } catch (err) {/* Invalid Token. */ }
    }

    // Verify if the admin is present in the profiles array
    if (user && user.profiles) admin = user.profiles.includes('admin');

    const err = new Error('Access Denied!');

    return {
        user,
        admin,
        validateUser() { if (!user) throw err; },
        validateAdmin() { if (!admin) throw err; },
        validateUserFilter(filter) {
            if (admin) return;

            if (!user) throw err;
            if (!filter) throw err;

            const { id, email } = filter;
            if (!id && !email) throw err;
            if (id && id !== user.id) throw err;
            if (email && email !== user.email) throw err;
        }
    //     text: "Course GraphQL!",
    //     print() {
    //         console.log("Course GraphQL!!!!!!!");
    //     }
    }
};
