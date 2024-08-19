const axios = require('axios');
const API_URL = process.env.API_URL;

const teacher = {
    dashboard: (req, res, next) => {
        res.render('teacher/dashboard', { title: 'Dashboard' });
    },

    getScoreBoard: (req, res, next) => {
        res.render('teacher/scoreboard', { title: 'Scoreboard' });
    },

    getSchedule: (req, res, next) => {
        const user = req.session.acc;
        res.render('teacher/schedule', { title: 'Schedule', classID: user.classHomeroom });
    },

    getAnnouncement: async (req, res, next) => {
        try {
            const user = req.session.acc;
            const students = (await axios.get(`${API_URL}student/${user.classHomeroom}`)).data;
            const history = (await axios.get(`${API_URL}ancm/list/sent/${user._id}`)).data;
            const receives = (await axios.get(`${API_URL}ancm/list/receive/${user._id}`)).data;
            let countAnnouncement = 0;
            let countRemind = 0;
            let countInvitation = 0;
            history.forEach((element) => {
                if (element.type == 'remind') countRemind++;
                else if (element.type == 'announcement') countAnnouncement++;
                else countInvitation++;
            });
            const success = req.flash('success') || '';
            const error = req.flash('error') || '';
            res.render('teacher/announcement', {
                title: 'Announcement',
                students,
                receives,
                success,
                error,
                countAnnouncement,
                countRemind,
                countInvitation,
                history,
            });
        } catch (error) {
            console.error(error);
            res.render('error', { title: 'Error', layout: 'auth', message: 'Something went wrong' });
        }
    },

    getClassroom: async (req, res) => {
        try {
            const user = req.session.acc;
            const students = (await axios.get(`${API_URL}student/${user.classHomeroom}`)).data;
            const classname = students[0]?.currentClass.name;
            res.render('teacher/classroom', { title: 'Classroom', students, classname });
        } catch (error) {
            console.error(error);
            res.render('error', { title: 'Error', layout: 'auth', message: 'Something went wrong' });
        }
    },

    getAttendance: async (req, res) => {
        try {
            const classID = req.session.acc.classHomeroom;
            const date = req.query.date;
            let students = (await axios.get(`${API_URL}attend/list/${classID}/${date}`)).data?.students;

            if (!students) {
                students = (await axios.get(`${API_URL}student/${classID}`)).data;
                students = students.map((student) => ({ student }));
            }

            res.render('teacher/attendance', { title: 'Attendance', students, classID });
        } catch (error) {
            console.error(error);
            res.render('error', { title: 'Error', layout: 'auth', message: 'Something went wrong' });
        }
    },
    createAnnouncement: (req, res, next) => {
        if (!req.body.type) {
            req.flash('error', 'Please, chose the announcement type!');
            return res.redirect('/t/announcement');
        }
        if (!req.body.role) {
            req.flash('error', 'Please, chose who can see the announcement!');
            return res.redirect('/t/announcement');
        }
        if (!req.body.sendTo) {
            req.flash('error', 'Please, chose recipients by clicking "SAVE DATA"!');
            return res.redirect('/t/announcement');
        }
        const user = req.session.acc;
        const data = {
            title: req.body.title,
            type: req.body.type,
            sendTo: req.body.sendTo,
            body: req.body.body,
            role: req.body.role,
            sendBy: user._id,
        };

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: data,
            url: `http://localhost:8080/api/ancm/create`,
        };
        axios(options)
            .then(function (response) {
                req.flash('success', 'Create new announcement successfully');
                res.redirect('/t/announcement');
            })
            .catch(function (error) {
                req.flash('error', 'Create new announcement fail ' + error);
                res.redirect('/t/announcement');
            });
    },
};

module.exports = teacher;
