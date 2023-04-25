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
        res.render('teacher/schedule', { title: 'Schedule' });
    },

    getAnnouncement: (req, res, next) => {
        res.render('teacher/announcement', { title: 'Announcement' });
    },

    getClassroom: async (req, res) => {
        try {
            const students = (await axios.get(`${API_URL}student/list`)).data;
            res.render('teacher/classroom', { title: 'Classroom', students });
        } catch (error) {
            console.error(error);
            res.render('error', { title: 'Error', layout: 'auth', message: 'Something went wrong' });
        }
    },

    getAttendance: async (req, res) => {
        try {
            const students = (await axios.get(`${API_URL}student/list`)).data;
            res.render('teacher/attendance', { title: 'Attendance', students });
        } catch (error) {
            console.error(error);
            res.render('error', { title: 'Error', layout: 'auth', message: 'Something went wrong' });
        }
    },
};

module.exports = teacher;
