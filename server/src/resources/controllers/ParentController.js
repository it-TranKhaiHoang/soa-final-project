const ClassService = require('../services/ClassService');
const ParentService = require('../services/ParentService');
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

const ParentController = {
    postCreate: (req, res, next) => {
        const { email, fullname, phone, address, stu_fullname, birth, gender, currentGrade } = req.body;
        const password = hashPassword(email.split('@')[0]);
        const parent = {
            email,
            fullname,
            password,
            phone,
            address,
        };
        ParentService.create(parent)
            .then((parent) => {
                const studentID = createStudentID();
                const stu_password = hashPassword(studentID);
                StudentService.create({
                    studentID,
                    fullname: stu_fullname,
                    password: stu_password,
                    birth,
                    gender,
                    address,
                    currentGrade,
                    parent: parent._id,
                }).then((student) => {
                    parent.student = student._id;
                    parent.save();
                    res.status(201).json({ message: 'New student has been created successfully' });
                });
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    putUpdate: (req, res, next) => {
        const { email, fullname, phone, password, address } = req.body;
        ParentService.update(req.params.id, { email, fullname, password: hashPassword(password), phone, address })
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
        ParentService.getList({}, {}, {}, 'student')
            .then((parents) => {
                if (parents.length > 0) {
                    res.status(200).json(parents);
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getListByClassID: (req, res, next) => {
        ClassService.getOneByIDAndPopulate(req.params.classID, {
            path: 'students',
            populate: { path: 'parent', populate: { path: 'student' } },
        })
            .then((cls) => {
                if (cls) {
                    const listStudent = cls.students;
                    let listParent = [];
                    listStudent.forEach((item) => {
                        listParent.push(item.parent);
                    });
                    res.status(200).json(listParent);
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getStudentID: (req, res, next) => {
        ParentService.getOne({ student: req.params.studentID })
            .then((parent) => {
                if (parent) {
                    res.status(200).json(parent);
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getDetail: (req, res, next) => {
        ParentService.getOneByID(req.params.id)
            .then((parent) => {
                if (parent) {
                    res.status(200).json(parent);
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
};

module.exports = ParentController;
