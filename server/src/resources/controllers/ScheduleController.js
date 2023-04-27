const ScheduleService = require('../services/ScheduleService');

const ScheduleController = {
    postCreate: (req, res, next) => {
        const data = {
            subject: req.body.subject,
            currentClass: req.body.currentClass,
            dayOfWeek: req.body.dayOfWeek,
            startAt: req.body.startAt,
            endAt: req.body.endAt,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
        };
        ScheduleService.create(data)
            .then(() => {
                res.status(201).json({ message: 'New subject has been created successfully' });
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getListByClassID: (req, res, next) => {
        ScheduleService.getList({ currentClass: req.params.classID }, {}, {}, 'subject')
            .then((schedules) => {
                res.status(200).json(schedules);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
};

module.exports = ScheduleController;
