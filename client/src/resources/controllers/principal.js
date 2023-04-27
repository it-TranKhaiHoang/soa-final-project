const API_URL = process.env.API_URL;
const axios = require('axios');

const principal = {
    dashboard: (req, res, next) => {
        res.redirect('/p/classroom');
    },

    getTeacher: async (req, res, next) => {
        const success = req.flash('success') || '';
        const error = req.flash('error') || '';
        const user = req.session.acc;
        let listTeacher;
        listTeacher = (await axios.get(`${API_URL}SchoolStaff/teacher`)).data;
        const listFree = listTeacher.filter((item) => {
            return !item.isHomeroom;
        });
        const listHomeroom = listTeacher.filter((item) => {
            return item.isHomeroom;
        });
        res.render('principal/teacher', {
            title: 'Teacher',
            user: 'principal',
            error,
            success,
            listFree,
            listHomeroom,
            listTeacher,
        });
    },

    getAnnouncement: async (req, res, next) => {
        const user = req.session.acc;
        let listParent;
        let listTeacher;
        let history;
        let countAnnouncement = 0;
        let countRemind = 0;
        let countInvitation = 0;
        listTeacher = (await axios.get(`${API_URL}SchoolStaff/teacher`)).data;
        listParent = (await axios.get(`${API_URL}parent/list`)).data;
        history = (await axios.get(`${API_URL}ancm/list/sent/${user._id}`)).data;
        history.forEach((element) => {
            if (element.type == 'remind') countRemind++;
            else if (element.type == 'announcement') countAnnouncement++;
            else countInvitation++;
        });
        const success = req.flash('success') || '';
        const error = req.flash('error') || '';
        res.render('principal/announcement', {
            user: 'principal',
            error,
            success,
            listTeacher,
            listParent,
            history,
            countAnnouncement,
            countInvitation,
            countRemind,
        });
    },

    getScheduleDetail: async (req, res, next) => {
        try {
            const success = req.flash('success');
            const error = req.flash('error');
            const classID = req.path.split('/')[2];
            const currentClass = (await axios.get(`${API_URL}class/${classID}`)).data;
            const subjects = (await axios.get(`${API_URL}subject/list/${currentClass.grade}`)).data;
            const schedules = (await axios.get(`${API_URL}schedule/${classID}`)).data;
            res.render('principal/schedule', {
                title: 'Classroom',
                success,
                error,
                subjects,
                classID,
            });
        } catch (error) {
            console.error(error);
            res.render('error', { layout: 'auth', message: 'Something went wrong' });
        }
    },

    getClassroom: async (req, res, next) => {
        try {
            const success = req.flash('success');
            const error = req.flash('error');

            const listClass = (await axios.get(`${API_URL}class/list`)).data;
            const listTeacher = (await axios.get(`${API_URL}SchoolStaff/available`)).data;
            const listAvailableStudent = (await axios.get(`${API_URL}student/list/available`)).data;
            const list = listClass?.map((item) => ({ ...item, listStudent: listAvailableStudent }));

            grade = {
                grade1st: list.filter((item) => item.grade == '1st'),
                grade2nd: list.filter((item) => item.grade == '2nd'),
                grade3rd: list.filter((item) => item.grade == '3rd'),
                grade4th: list.filter((item) => item.grade == '4th'),
                grade5th: list.filter((item) => item.grade == '5th'),
            };
            res.render('principal/classroom', {
                title: 'Classroom',
                grade,
                listTeacher,
                listClass: list,
                success,
                error,
            });
        } catch (error) {
            console.error(error);
            res.render('error', { layout: 'auth', message: 'Something went wrong' });
        }
    },

    createClass: (req, res, next) => {
        const data = {
            name: req.body.name,
            currentYear: req.body.currentYear,
            teacher: req.body.teacher,
            grade: req.body.grade,
        };
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: data,
            url: `${API_URL}class/create`,
        };
        axios(options)
            .then(function (response) {
                req.flash('success', 'Create new class successfully');
                res.redirect('/p/classroom');
            })
            .catch(function (error) {
                req.flash('error', 'Create new class fail ' + error);
                res.redirect('/p/classroom');
            });
    },
    createAnnouncement: (req, res, next) => {
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
                res.redirect('/p/announcement');
            })
            .catch(function (error) {
                req.flash('error', 'Create new announcement fail ' + error);
                res.redirect('/p/announcement');
            });
    },

    createSchedule: async (req, res, next) => {
        try {
            const data = {
                subject: req.body.subject,
                currentClass: req.body.classID,
                dayOfWeek: req.body.dayOfWeek,
                startAt: req.body.startAt,
                endAt: req.body.endAt,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
            };
            const options = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: data,
                url: `${API_URL}schedule/create`,
            };
            axios(options)
                .then(function (response) {
                    req.flash('success', 'Create new schedule successfully');
                    res.redirect(`/p/schedule/${req.body.classID}`);
                })
                .catch(function (error) {
                    req.flash('error', 'Create new schedule fail ' + error);
                    res.redirect(`/p/schedule/${req.body.classID}`);
                });
        } catch (error) {
            console.error(error);
            res.render('error', { layout: 'auth', message: 'Something went wrong' });
        }
    },
};

module.exports = principal;
