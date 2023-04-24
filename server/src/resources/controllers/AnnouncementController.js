const AnnouncementService = require('../services/AnnouncementService');
const API_URL = process.env.API_URL || 'http://localhost:5000/api/';
const fetch = require('node-fetch');
const ParentService = require('../services/ParentService');
const Parent = require('../models/Parent');

const AnnouncementController = {
    postCreate: (req, res, next) => {
        const { sendBy, sendTo, type, role, title, body, status } = req.body;
        const list = sendTo.split(',');
        AnnouncementService.create({ sendBy, sendTo: list, type, role, title, body, status })
            .then(() => {
                Parent.find({ _id: { $in: list } })
                    .select('email')
                    .then((emails) => {
                        if (emails.length > 0) {
                            emails.forEach((item) => {
                                let mail_option = {
                                    receiver: item.email,
                                    subject: title,
                                    html: `<p>${body}</p>
                                          <p>Link: http://localhost:8080/project/</p>    
                                    `,
                                };
                                let mailBody = JSON.stringify(mail_option);
                                fetch(API_URL + 'mail/send-email', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: mailBody,
                                });
                            });
                        } else {
                            res.status(404).json({ message: 'Unknown Recipient' });
                        }
                    });
                res.status(201).json({ message: 'New announcement has been created successfully' });
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getListSent: (req, res, next) => {
        AnnouncementService.getList({ sendBy: '6444fb7fe14137d2c1586b02' }, {}, {}, '')
            .then((announcements) => {
                if (announcements.length > 0) {
                    res.status(200).json(announcements);
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getListReceived: (req, res, next) => {
        AnnouncementService.getList({ sendTo: { $in: ['6445427c934b44c3693c49da'] } }, {}, {}, '')
            .then((announcements) => {
                if (announcements.length > 0) {
                    res.status(200).json(announcements);
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getDetailByID: (req, res, next) => {
        AnnouncementService.getOneByID(req.params.id)
            .then((announcement) => {
                if (!announcement) return res.status(404).json({ message: 'Announcement Not Found' });
                res.status(200).json(announcement);
            })
            .catch((err) => res.status(500).json({ error: err }));
    },
};

module.exports = AnnouncementController;
