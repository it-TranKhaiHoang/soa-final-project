const SubjectService = require('../services/SubjectService');

const SubjectController = {
    postCreate: (req, res, next) => {
        const { name, description, grade } = req.body;
        SubjectService.create({ name, description, grade })
            .then(() => {
                res.status(201).json({ message: 'New subject has been created successfully' });
            })
            .catch((err) => {
                console.error('Error at SubjectController.postCreate: ', err);
                res.status(500).json({ error: err });
            });
    },
    getListAll: (req, res, next) => {
        SubjectService.getList({}, {}, {})
            .then((subjects) => {
                res.status(200).json(subjects);
            })
            .catch((err) => {
              console.error('Error at SubjectController.getListAll: ', err);
              res.status(500).json({ error: err });
            });
    },
    getListByGrade: (req, res, next) => {
        SubjectService.getList({ grade: req.params.grade }, {}, {})
            .then((subjects) => {
                res.status(200).json(subjects);
            })
            .catch((err) => {
              console.error('Error at SubjectController.getListByGrade: ', err);
              res.status(500).json({ error: err });
            });
    },
};

module.exports = SubjectController;
