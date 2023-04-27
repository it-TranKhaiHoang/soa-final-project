const SubjectService = require('../services/SubjectService');

const SubjectController = {
    postCreate: (req, res, next) => {
        const { name, description, teacher } = req.body;
        SubjectService.create({ name, description, teacher })
            .then(() => {
                res.status(201).json({ message: 'New subject has been created successfully' });
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getListAll: (req, res, next) => {
        SubjectService.getList({}, {}, {}, 'teacher')
            .then((subjects) => {
                res.status(200).json(subjects);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getListByGrade: (req, res, next) => {
        SubjectService.getList({ grade: req.params.grade }, {}, {}, 'teacher')
            .then((subjects) => {
                res.status(200).json(subjects);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
};

module.exports = SubjectController;
