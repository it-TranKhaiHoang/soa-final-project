module.exports = function (req, res, next) {
    const path = req.path.split('/')[1];
    req.user = 'principal';

    if (path === 's') {
        if (req.user === 'student') {
            return next();
        }
        return res.redirect('/auth/login');
    }

    if (path === 't' && req.user === 'teacher') {
        if (req.user === 'student') {
            return next();
        }
        return res.redirect('/auth/login');
    }
    if (path === 'p' && req.user === 'principal') {
        if (req.user === 'student') {
            return next();
        }
        return res.redirect('/auth/login');
    }

    return res.render('error', { layout: 'auth' });
};
