function authorize(role) {
    return function (req, res, next) {
        if (role.includes(req.user.Position)) return res.status(403).json({message: 'Access denied'});
        next();
    };
}
module.exports = authorize;