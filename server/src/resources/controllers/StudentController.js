const StudentService = require('../services/StudentService');
const bcrypt = require('bcryptjs');

function hashPassword(password) {
    let saltRounds = 10;
    let salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}
function createStudentID() {
    const now = new Date();
    const year = parseInt(now.getFullYear().toString().slice(-2));
    const randomNum = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, '0');
    const id = `STU${year}${randomNum}`; // Combine the components with "STU" prefix
    return id;
}
const StudentController = {
    postCreate: (req, res, next) => {
        const { fullname, birth, gender, address, currentGrade } = req.body;
        const studentID = createStudentID();
        const password = hashPassword(studentID);
        StudentService.create({ studentID, fullname, password, birth, gender, address, currentGrade })
            .then(() => {
                res.status(201).json({ message: 'New student has been created successfully' });
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    putUpdate: (req, res, next) => {
        const { fullname, birth, gender, address, currentGrade } = req.body;
        const password = hashPassword(req.body.password);
        StudentService.update(req.params.id, { fullname, birth, password, gender, address, currentGrade })
            .then(() => {
                res.status(200);
                res.json({ message: 'Update Successfully' });
            })
            .catch((err) => {
                res.status(500);
                res.json({ message: err });
            });
    },
    getListAll: (req, res, next) => {
        StudentService.getList({}, {}, {}, 'currentClass')
            .then((students) => {
                if (students.length > 0) {
                    res.status(200).json(students);
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getListByClass: (req, res, next) => {
        StudentService.getList({ currentClass: req.params.classID }, {}, {}, 'currentClass')
            .then((students) => {
                if (students.length > 0) {
                    res.status(200).json(students);
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getListByGrade: (req, res, next) => {
        StudentService.getList({ currentGrade: req.params.grade }, {}, {}, 'currentClass')
            .then((students) => {
                if (students.length > 0) {
                    res.status(200).json(students);
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
};

module.exports = StudentController;
