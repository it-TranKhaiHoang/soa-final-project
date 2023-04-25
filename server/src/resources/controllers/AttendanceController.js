const AttendanceService = require('../services/AttendanceService');

const AttendanceController = {
    postCreate: (req, res, next) => {
        const { student, currentDate, isPresent, description } = req.body;
        AttendanceService.create({ student, currentDate, isPresent, description })
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
        AttendanceService.getList({ currentDate: new Date(req.params.date) }, {}, {}, 'student')
            .then((attendances) => {
                if (attendances.length > 0) {
                    const filteredAttendances = attendances.filter((att) => {
                        return att.student.currentClass == req.params.classID;
                    });
                    res.status(200).json(filteredAttendances);
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
};

module.exports = AttendanceController;
