const AttendanceService = require('../services/AttendanceService');
const StudentService = require('../services/StudentService');

const AttendanceController = {
    postCreate: async (req, res, next) => {
        const { students, description } = req.body;
        const classId = req.headers.classid;
        const list = await StudentService.getList({ currentClass: classId }, {}, {}, '');
        const result = list.map((student) => {
            if (students.includes(student._id)) {
                return { student: student._id, isPresent: true };
            }
            return { student: student._id, isPresent: false };
        });
        AttendanceService.create({ class: classId, students: result, description })
            .then(() => {
                res.status(201).json({ message: 'New attendance has been created successfully' });
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getListAll: (req, res, next) => {
        AttendanceService.getList({}, {}, {}, 'student')
            .then((attendances) => {
                if (attendances.length > 0) {
                    res.status(200).json(attendances);
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getListByStudentID: (req, res, next) => {
        AttendanceService.getList({ student: req.params.studentID }, {}, {}, 'student')
            .then((attendances) => {
                if (attendances.length > 0) {
                    res.status(200).json(attendances);
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getListByClassIDandDate: (req, res, next) => {
        const { date, classID } = req.params;
        AttendanceService.getOne({ date: { $gt: new Date(date) }, class: classID }, 'students')
            .then((attendance) => {
                res.status(200).json(attendance);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    },
};

module.exports = AttendanceController;
