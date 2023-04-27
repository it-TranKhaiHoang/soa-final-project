const ScheduleService = require('../services/ScheduleService');

const ScheduleController = {
    postCreate: (req, res, next) => {
        const data = {
            subject: req.body.subject,
            class: req.body.classID,
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
        ScheduleService.getList({ class: req.params.classID }, {}, {}, 'subject')
            .then((schedules) => {
                res.status(200).json(schedules);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
};

module.exports = ScheduleController;
