const AnnouncementService = require('../services/AnnouncementService');
const API_URL = process.env.API_URL || 'http://localhost:5000/api/';
const fetch = require('node-fetch');
const ParentService = require('../services/ParentService');
const Parent = require('../models/Parent');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const SchoolStaff = require('../models/SchoolStaff');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(email, data) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'tanphat200265@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });
        let info = await transport.sendMail({
            from: 'tanphat200265@gmail.com', // sender address
            to: email, // list of receivers
            subject: `${data.title} ✔`, // Subject line
            text: `${data.type}`, // plain text body
            html: `${data.body}`, // html body
        });
        console.log(info);
    } catch (error) {
        console.error(error);
    }
}

const AnnouncementController = {
    postCreate: (req, res, next) => {
        const { sendBy, sendTo, type, role, title, body } = req.body;
        const list = sendTo.split(',');
        AnnouncementService.create({ sendBy, sendTo: list, type, role, title, body })
            .then(() => {
                Parent.find({ _id: { $in: list } })
                    .select('email')
                    .then((emails) => {
                        if (emails.length > 0) {
                            emails.forEach((item) => {
                                sendMail(item.email, { title, type, body });
                            });
                        }
                    });
                SchoolStaff.find({ _id: { $in: list } })
                    .select('email')
                    .then((emails) => {
                        if (emails.length > 0) {
                            emails.forEach((item) => {
                                sendMail(item.email, { title, type, body });
                            });
                        }
                    });
                res.status(201).json({ message: 'New announcement has been created successfully', created: true });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ error: err });
            });
    },
    getListSent: (req, res, next) => {
        AnnouncementService.getList({ sendBy: req.params.id }, {}, { createdAt: -1 }, '')
            .then((announcements) => {
                res.status(200).json(announcements);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getListReceived: (req, res, next) => {
        AnnouncementService.getList({ sendTo: { $in: [`${req.params.id}`] } }, {}, { createdAt: -1 }, 'sendBy')
            .then((announcements) => {
                res.status(200).json(announcements);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getDetailByID: (req, res, next) => {
        AnnouncementService.getOneByID(req.params.id)
            .then((announcement) => {
                res.status(200).json(announcement);
            })
            .catch((err) => res.status(500).json({ error: err }));
    },
};

module.exports = AnnouncementController;
