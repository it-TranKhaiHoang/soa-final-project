const ClassService = require('../services/ClassService');

const ClassController = {
    getAllList: (req, res, next) => {
        return ClassService.getList({}, {}, {}, 'teacher')
            .then((classes) => {
                if (classes.length > 0) {
                    res.status(200).json(classes);
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getListByGrade: (req, res, next) => {
        return ClassService.getList({ grade: req.params.grade }, {}, {}, 'teacher')
            .then((classes) => {
                if (classes.length > 0) {
                    res.status(200).json(classes);
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getDetail: (req, res, next) => {
        return ClassService.getOneByID(req.params.id)
            .then((c) => {
                if (!c) return res.status(404).json({ message: 'Class Not Found' });
                res.status(200).json(c);
            })
            .catch((err) => res.status(500).json({ error: err }));
    },
    postCreate: (req, res, next) => {
        const { name, currentYear, teacher, grade } = req.body;
        ClassService.create({ name, currentYear, teacher, grade })
            .then(() => {
                res.status(201).json({ message: 'New class has been created successfully' });
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    putUpdate: (req, res, next) => {
        const { name, currentYear, teacher, grade } = req.body;
        ClassService.update(req.params.id, { name, currentYear, teacher, grade })
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

module.exports = ClassController;
