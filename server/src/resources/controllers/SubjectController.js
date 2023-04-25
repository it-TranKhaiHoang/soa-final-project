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
                if (subjects.length > 0) {
                    res.status(200).json(subjects);
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
};

module.exports = SubjectController;
