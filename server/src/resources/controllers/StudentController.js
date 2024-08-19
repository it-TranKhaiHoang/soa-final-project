const StudentService = require('../services/StudentService');
const ParentService = require('../services/ParentService');
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
    postCreate: async (req, res, next) => {
        const { fullname, birth, gender, address, currentGrade, parentName, parentEmail, parentPhone } = req.body;
        const studentID = createStudentID();
        const password = hashPassword(studentID);
        try {
            const student = await StudentService.create({
                studentID,
                fullname,
                password,
                birth,
                gender,
                address,
                currentGrade,
            });
            const parent = await ParentService.create({
                fullname: parentName,
                email: parentEmail,
                password: hashPassword(parentEmail.split('@')[0]),
                phone: parentPhone,
                address,
                student,
            });
            await StudentService.update(student._id, { parent });
            res.status(201).json({ message: 'New student has been created successfully' });
        } catch (error) {
            res.status(500).json({ error: err });
        }
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
        StudentService.getList({}, {}, {}, { path: 'currentClass', populate: { path: 'teacher' } })
            .then((students) => {
                students = students.map((student) => ({ ...student, birth: student.birth.toLocaleString('vi-VN') }));
                res.status(200).json(students);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getListFree: (req, res, next) => {
        StudentService.getList({ currentClass: null }, {}, {}, '')
            .then((students) => {
                students = students.map((student) => ({ ...student, birth: student.birth.toLocaleString('vi-VN') }));
                res.status(200).json(students);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getListByClass: (req, res, next) => {
        StudentService.getList(
            { currentClass: req.params.classID },
            {},
            {},
            { path: 'currentClass', populate: { path: 'teacher' } },
        )
            .then((students) => {
                students = students.map((student) => ({ ...student, birth: student.birth.toLocaleString('vi-VN') }));
                res.status(200).json(students);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ error: err });
            });
    },
    getListByGrade: (req, res, next) => {
        StudentService.getList(
            { currentGrade: req.params.grade },
            {},
            {},
            { path: 'currentClass', populate: { path: 'teacher' } },
        )
            .then((students) => {
                students = students.map((student) => ({ ...student, birth: student.birth.toLocaleString('vi-VN') }));
                res.status(200).json(students);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
};

module.exports = StudentController;
