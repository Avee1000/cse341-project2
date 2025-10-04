const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(401).json("You do not have access." );
    }
    next();
}

module.exports = isAuthenticated;

    // // Allow if Passport thinks the user is authenticated
    // if (typeof req.isAuthenticated === 'function' && req.isAuthenticated()) {
    //     return next();
    // }

    // // Fallback: check session.user (the code sets this after successful OAuth)
    // if (req.session && req.session.user) {
    //     return next();
    // }

    // return res.status(401).json("You do not have access.");
