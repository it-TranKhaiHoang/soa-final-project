const SchoolStaffService = require('../services/SchoolStaffService');
const bcrypt = require('bcryptjs');

function hashPassword(password) {
    let saltRounds = 10;
    let salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}
const SchoolStaffController = {
    postCreate: (req, res, next) => {
        const { email, fullname, phone, position, address, gender } = req.body;
        const password = hashPassword(email.split('@')[0]);
        SchoolStaffService.create({ email, password, fullname, phone, position, address, gender })
            .then(() => {
                res.status(201).json({ message: 'New school staff has been created successfully' });
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    putUpdate: (req, res, next) => {
        const { email, fullname, password, phone, position, address, gender } = req.body;
        SchoolStaffService.update(req.params.id, {
            email,
            fullname,
            password: hashPassword(password),
            phone,
            position,
            address,
            gender,
        })
            .then(() => {
                res.status(200);
                res.json({ message: 'Update Successfully' });
            })
            .catch((err) => {
                res.status(500);
                res.json({ message: err });
            });
    },
    getListTeacher: (req, res, next) => {
        SchoolStaffService.getList({ position: 'teacher' }, {}, {}, '')
            .then((teachers) => {
                if (teachers.length > 0) {
                    res.status(200).json(teachers);
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getListAvailable: (req, res, next) => {
        SchoolStaffService.getList({ isHomeroom: false, position: 'teacher' }, {}, {}, '')
            .then((teachers) => {
                if (teachers.length > 0) {
                    res.status(200).json(teachers);
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getDetail: (req, res, next) => {
        SchoolStaffService.getOneByID(req.params.id)
            .then((teacher) => {
                if (!teacher) return res.status(404).json({ message: 'Teacher Not Found' });
                res.status(200).json(teacher);
            })
            .catch((err) => res.status(500).json({ error: err }));
    },
    putOnHomeroom: (req, res, next) => {
        SchoolStaffService.update(req.params.id, { isHomeroom: true })
            .then(() => {
                res.status(200);
                res.json({ message: 'Update Successfully' });
            })
            .catch((err) => {
                res.status(500);
                res.json({ message: err });
            });
    },
    putOffHomeroom: (req, res, next) => {
        SchoolStaffService.update(req.params.id, { isHomeroom: false })
            .then(() => {
                res.status(200);
                res.json({ message: 'Update Successfully' });
            })
            .catch((err) => {
                res.status(500);
                res.json({ message: err });
            });
    },
};

module.exports = SchoolStaffController;
