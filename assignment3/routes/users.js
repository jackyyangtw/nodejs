const express = require('express');
const router = express.Router();
const userData = require('./home');

router.get("/users", (req, res, next) => {
    const users = userData.users;
    res.render('users', {
        users,
        path: '/users'
    });
});

module.exports = router;