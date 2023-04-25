const ScoresService = require('../services/ScoresService');

const ScoresController = {
    postCreate: (req, res, next) => {
        const { student, subject, semester, year, score, levelAchieved } = req.body;
        ScoresService.create({ student, subject, semester, year, score, levelAchieved })
            .then(() => {
                res.status(201).json({ message: 'New scores has been created successfully' });
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getListByStudentID: (req, res, next) => {
        ScoresService.getList({ status: 'verified', student: req.params.studentID }, {}, {}, 'subject')
            .then((scores) => {
                if (scores.length > 0) {
                    res.status(200).json(scores);
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getListWaiting: (req, res, next) => {
        ScoresService.getList({ status: 'pending' }, {}, {}, 'subject')
            .then((scores) => {
                if (scores.length > 0) {
                    res.status(200).json(scores);
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
};

module.exports = ScoresController;
