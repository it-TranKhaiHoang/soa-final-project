function verify(role) {
    return function (req, res, next) {
        // req.user = 'principal';
        // if (role === req.user) {
        //     return next();
        // } else if (req.user === 'teacher') {
        // }
        // res.render('error', { layout: 'auth' });
        return next();
    };
}

module.exports = verify;
