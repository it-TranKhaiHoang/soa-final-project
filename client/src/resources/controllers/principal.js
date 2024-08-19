const API_URL = process.env.API_URL;
const axios = require('axios');

const principal = {
    dashboard: (req, res, next) => {
        res.redirect('/p/classroom');
    },

    getTeacher: async (req, res, next) => {
        const success = req.flash('success') || '';
        const error = req.flash('error') || '';
        let listTeacher;
        try {
            listTeacher = (await axios.get(`${API_URL}SchoolStaff/teacher`)).data;
        } catch (error) {
            listTeacher = [];
            console.error(error);
        }
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

    getSubject: async (req, res, next) => {
        const success = req.flash('success') || '';
        const error = req.flash('error') || '';
        let subjects;
        try {
            subjects = (await axios.get(`${API_URL}subject/list`)).data;
        } catch (error) {
            subjects = [];
            console.error(error);
        }
        subjects = {
            grade1st: subjects.filter((item) => item.grade == '1st'),
            grade2nd: subjects.filter((item) => item.grade == '2nd'),
            grade3rd: subjects.filter((item) => item.grade == '3rd'),
            grade4th: subjects.filter((item) => item.grade == '4th'),
            grade5th: subjects.filter((item) => item.grade == '5th'),
        };
        res.render('principal/subject', {
            title: 'Subject',
            user: 'principal',
            error,
            success,
            subjects,
        });
    },

    getStudent: async (req, res, next) => {
        const success = req.flash('success') || '';
        const error = req.flash('error') || '';
        let students;
        try {
            students = (await axios.get(`${API_URL}student/list`)).data;
        } catch (error) {
            students = [];
            console.error(error);
        }
        students = {
            grade1st: students.filter((item) => item.currentGrade == '1st'),
            grade2nd: students.filter((item) => item.currentGrade == '2nd'),
            grade3rd: students.filter((item) => item.currentGrade == '3rd'),
            grade4th: students.filter((item) => item.currentGrade == '4th'),
            grade5th: students.filter((item) => item.currentGrade == '5th'),
        };
        res.render('principal/student', {
            title: 'Student',
            user: 'principal',
            error,
            success,
            students,
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
        try {
            listTeacher = (await axios.get(`${API_URL}SchoolStaff/teacher`)).data;
        } catch (error) {
            listTeacher = [];
            console.error(error);
        }
        try {
            listParent = (await axios.get(`${API_URL}parent/list`)).data;
        } catch (error) {
            listParent = [];
            console.error(error);
        }
        try {
            history = (await axios.get(`${API_URL}ancm/list/sent/${user._id}`)).data;
        } catch (error) {
            history = [];
            console.error(error);
        }

        history.forEach((element) => {
            if (element.type == 'remind') countRemind++;
            else if (element.type == 'announcement') countAnnouncement++;
            else countInvitation++;
        });
        const success = req.flash('success') || '';
        const error = req.flash('error') || '';
        res.render('principal/announcement', {
            user: 'principal',
            title: 'Announcement',
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
        if (!req.body.grade) {
            req.flash('error', 'Please, chose class grade!');
            return res.redirect('/p/classroom');
        }
        if (!req.body.teacher) {
            req.flash('error', 'Please, chose a teacher!');
            return res.redirect('/p/classroom');
        }
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
                console.error(error);
                req.flash('error', 'Something went wrong. Please try again later!');
                res.redirect('/p/classroom');
            });
    },

    createTeacher: (req, res, next) => {
        if (!req.body.gender) {
            req.flash('error', 'Please, chose teacher gender!');
            return res.redirect('/p/teacher');
        }

        const data = {
            fullname: req.body.fullname,
            email: req.body.email,
            gender: req.body.gender,
            address: req.body.address,
            phone: req.body.phone,
            isHomeroom: req.body.classHomeroom ? true : false,
            classHomeroom: req.body.classHomeroom,
            position: 'teacher',
        };
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: data,
            url: `${API_URL}SchoolStaff/create`,
        };
        axios(options)
            .then(function (response) {
                req.flash('success', 'Create new teacher successfully');
                res.redirect('/p/teacher');
            })
            .catch(function (error) {
                console.error(error);
                req.flash('error', 'Something went wrong. Please try again later!');
                res.redirect('/p/teacher');
            });
    },

    createSubject: (req, res, next) => {
        if (!req.body.grade) {
            req.flash('error', 'Please, chose subject grade!');
            return res.redirect('/p/subject');
        }

        const data = {
            name: req.body.name,
            currentGrade: req.body.currentGrade,
            description: req.body.description,
        };
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: data,
            url: `${API_URL}subject/create`,
        };
        axios(options)
            .then(function (response) {
                req.flash('success', 'Create new subject successfully');
                res.redirect('/p/subject');
            })
            .catch(function (error) {
                console.error(error);
                req.flash('error', 'Something went wrong. Please try again later!');
                res.redirect('/p/subject');
            });
    },

    createStudent: (req, res, next) => {
        if (!req.body.gender) {
            req.flash('error', 'Please, chose student gender!');
            return res.redirect('/p/student');
        }
        if (!req.body.currentGrade) {
            req.flash('error', 'Please, chose student grade!');
            return res.redirect('/p/student');
        }
        const data = {
            fullname: req.body.fullname,
            gender: req.body.gender,
            birth: req.body.birth,
            currentGrade: req.body.currentGrade,
            address: req.body.address,
            parentName: req.body.parentName,
            parentEmail: req.body.parentEmail,
            parentPhone: req.body.parentPhone,
        };
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: data,
            url: `${API_URL}student/create`,
        };
        axios(options)
            .then(function (response) {
                req.flash('success', 'Create new student successfully');
                res.redirect('/p/student');
            })
            .catch(function (error) {
                console.error(error);
                req.flash('error', 'Something went wrong. Please try again later!');
                res.redirect('/p/student');
            });
    },

    createAnnouncement: (req, res, next) => {
        if (!req.body.type) {
            req.flash('error', 'Please, chose the announcement type!');
            return res.redirect('/p/announcement');
        }
        if (!req.body.role) {
            req.flash('error', 'Please, chose who can see the announcement!');
            return res.redirect('/p/announcement');
        }
        if (!req.body.sendTo) {
            req.flash('error', 'Please, chose recipients by clicking "SAVE DATA"!');
            return res.redirect('/p/announcement');
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
                res.redirect('/p/announcement');
            })
            .catch(function (error) {
                req.flash('error', 'Create new announcement fail ' + error);
                res.redirect('/p/announcement');
            });
    },

    createSchedule: async (req, res, next) => {
        try {
            if (!req.body.subject) {
                req.flash('error', 'Please, chose the subject!');
                return res.redirect('/p/announcement');
            }

            if (!req.body.dayOfWeek) {
                req.flash('error', 'Please, chose the date!');
                return res.redirect('/p/announcement');
            }
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
