const express = require('express');
const router = express.Router();
const axios = require('axios');
const API_URL = process.env.API_URL;
router.get('/', (req, res, next) => {
    res.render('principal/dashboard', { user: 'principal' });
});

async function getData(url) {
    return await axios.get(url);
}
function getListClasses() {
    return getData(`${API_URL}class/list`);
}
function getAvailTeacher() {
    return getData(`${API_URL}SchoolStaff/available`);
}

const fetchData = async (url) => {
    try {
        const response = await axios.get(`${API_URL}${url}`);
        return response.data;
    } catch (error) {
        return null;
    }
};

router.get('/classroom', async (req, res, next) => {
    const success = req.flash('success') || '';
    const error = req.flash('error') || '';
    let listClass;
    let listTeacher;
    let listAvailableStudent;
    listClass = (await fetchData('class/list')) || null;
    listTeacher = (await fetchData('SchoolStaff/available')) || null;
    listAvailableStudent = (await fetchData('student/list/available')) || null;
    const list = listClass.map((item) => {
        return { ...item, listStudent: listAvailableStudent };
    });
    const grade1st = list.filter((item) => {
        return item.grade == '1st';
    });
    const grade2nd = list.filter((item) => {
        return item.grade == '2nd';
    });
    const grade3rd = list.filter((item) => {
        return item.grade == '3rd';
    });
    const grade4th = list.filter((item) => {
        return item.grade == '4th';
    });
    const grade5th = list.filter((item) => {
        return item.grade == '5th';
    });
    res.render('principal/classroom', {
        user: 'principal',
        grade1st,
        grade2nd,
        grade3rd,
        grade4th,
        grade5th,
        listTeacher,
        listClass: list,
        success,
        error,
    });
});

router.get('/announcement', (req, res, next) => {
    res.render('principal/announcement', { user: 'principal' });
});

router.get('/schedule', (req, res, next) => {
    res.render('principal/schedule', { user: 'principal' });
});

module.exports = router;
