const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');

// Signup
router.post('/signup', (req, res) => {
    db.User.create({
        first: req.body.first,
        last: req.body.last,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    }).then(newUser => {
        req.session.user = {
            first: newUser.first,
            last: newUser.last,
            email: newUser.email,
            role: newUser.role,
            id: newUser.id
        }
        res.redirect("/profile")
    }).catch(err => {
        console.log(err);
        res.status(500).send("Server error")
    })
})

// Login
router.post('/login', (req, res) => {
    db.User.findOne({
        where: { email: req.body.email }
    }).then(user => {
        //check if user entered password matches db password
        if (!user) {
            req.session.destroy();
            return res.status(401).redirect("/error")

        } else if (bcrypt.compareSync(req.body.password, user.password)) {
            req.session.user = {
                first: user.first,
                last: user.last,
                email: user.email,
                role: user.role,
                id: user.id
            }
            return res.redirect("/profile")
        }
        else {
            req.session.destroy();
            return res.status(401).redirect("/error")
        }
    })
})

// Logout 
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect("/")
})

router.get("/sessiondata", (req, res) => {
    res.json(req.session)
})

module.exports = router;

