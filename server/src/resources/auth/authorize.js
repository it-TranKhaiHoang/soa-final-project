function authorize(role) {
    return function (req, res, next) {
        const user = req.session.user;
        if (!role.includes(user.position)) return res.status(403).json({ message: 'Access denied' });
        next();
    };
}
module.exports = authorize;
