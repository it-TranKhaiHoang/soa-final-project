module.exports = function (req, res, next) {
    const path = req.originalUrl.split('/')[1];

    req.user = 'principal';
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    if (path === 's' && req.user === 'student') {Vé
        return next();
    }

    if (path === 't' && req.user === 'teacher') {
        return next();
    }

    if (path === 'p' && req.user === 'principal') {
        return next();
    }

    return res.render('error', { layout: 'auth' });
};
