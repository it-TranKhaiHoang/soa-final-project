module.exports = function (req, res, next) {
    const path = req.originalUrl.split('/')[1];

    const user = req.session.user;
    if (!user) {
        return res.redirect('/auth/login');
    }

    if (path === 's' && user === 'student') {
        return next();
    }

    if (path === 't' && user === 'teacher') {
        return next();
    }

    if (path === 'p' && user === 'principal') {
        return next();
    }

    return res.render('error', { layout: 'auth' });
};
