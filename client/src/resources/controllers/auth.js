const fetch = require('node-fetch');
const querystring = require('querystring');
const auth = {
    postLogin: (req, res, next) => {
        fetch('http://localhost:8080/api/user/login', {
            method: 'POST',
            body: querystring.stringify(req.body),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.token) {
                    req.session.token = data.token;
                    req.session.acc = data.user;
                    if (data.user.position === 'principal') {
                        req.session.user = 'principal';
                        res.redirect('/p');
                    } else if (data.user.position === 'teacher') {
                        req.session.user = 'teacher';
                        res.redirect('/t');
                    } else {
                        req.session.user = 'student';
                        res.redirect('/s');
                    }
                } else {
                    res.redirect('/auth/login');
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error');
            });
    },
    postLogout: (req, res, next) => {
        fetch('http://localhost:8080/api/user/logout', {
            method: 'POST',
            body: querystring.stringify(req.body),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
            .then((response) => response.json())
            .then((data) => {
                req.session.destroy();
                res.redirect('/');
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error');
            });
    },
};

module.exports = auth;
