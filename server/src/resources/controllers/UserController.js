const Parent = require('../models/Parent');
const SchoolStaff = require('../models/SchoolStaff');
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function comparePassword(req, res, user, password) {
    bcrypt
        .compare(password, user.password)
        .then((isValid) => {
            if (!isValid) return res.status(400).json('Invalid password');
            const JWT_SECRET = process.env.JWT_SECRET;
            const token = jwt.sign({ _id: user._id }, JWT_SECRET);
            req.session.user = user;
            req.session.token = token;
            res.header('x-auth-token', token).json({ message: 'Login successful.', token: token, user: user });
        })
        .catch((err) => res.status(500).json({ error: err }));
}

const UserController = {
    postLogin: async (req, res, next) => {
        const { email, password } = req.body;
        let isStaff = await SchoolStaff.findOne({ email: email }).lean();
        let isStudent = await Student.findOne({ studentID: email })
            .populate({ path: 'currentClass', populate: { path: 'teacher' } })
            .lean();
        let isParent = await Parent.findOne({ email: email })
            .populate({ path: 'student', populate: { path: 'currentClass', populate: { path: 'teacher' } } })
            .lean();
        if (isParent) {
            comparePassword(req, res, isParent, password);
        } else if (isStaff) {
            comparePassword(req, res, isStaff, password);
        } else if (isStudent) {
            comparePassword(req, res, isStudent, password);
        } else {
            res.status(400).json('Invalid email or student ID');
        }
    },
    postLogout: (req, res, next) => {
        req.session.destroy();
        res.header('x-auth-token', '').json({ message: 'Logout successful.' });
    },
};

module.exports = UserController;
