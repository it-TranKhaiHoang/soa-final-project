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
                    req.session.user = data.user;
                    req.session.token = data.token;
                    if (data.user.studentID) {
                        res.redirect('/#student');
                    } else {
                        if (data.user.position === 'principal') {
                            res.redirect('/classroom');
                        } else if (data.user.position === 'teacher') {
                            res.redirect('/classroom');
                        } else {
                            res.redirect('/#parent');
                        }
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
