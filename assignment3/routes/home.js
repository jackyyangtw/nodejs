const express = require('express');
const router = express.Router();
const users = []

router.post("/users", (req, res, next) => {
    users.push({ name: req.body.userName, age: req.body.userAge });
    res.redirect('/users');
})

router.get("/", (req, res, next) => {
    res.render('home', {
        pageTitle: 'Home',
        path: '/',
    });
});

exports.routes = router;
exports.users = users;