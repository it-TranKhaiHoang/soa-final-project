const API_URL = process.env.API_URL;
const axios = require('axios');

const principal = {
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
                user: 'principal',
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
                res.redirect('/principal/classroom');
            })
            .catch(function (error) {
                req.flash('error', 'Create new class fail ' + error);
                res.redirect('/principal/classroom');
            });
    },
};

module.exports = principal;
