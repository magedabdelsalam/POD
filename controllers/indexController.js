const express = require('express');
const router = express.Router();
const db = require('../models');

router.get("/", (req, res) => {
    res.render("index", { user: req.session.user })
})
router.get("/signup", (req, res) => {
    res.render("signup", { user: req.session.user })
})

router.get('/home', (req, res) => {
    if (req.session.user) {
    db.Pod.findAll({
        include: [db.User,db.Kid],
        order: [
            ["date", "ASC"],
            ["time", "DESC"]
        ]
    }).then(pods => {
        const podsJSON = pods.map(podObj => {
            return podObj.toJSON()
        })
        console.log(podsJSON)
        const hbsObj = {
            user: req.session.user,
            Pods: podsJSON
        }
        res.render("home", hbsObj);
    })
    } else {
        res.redirect("/")
    }
})

// Profile page
// router.get('/profile', (req, res) => {
//     if (req.session.user) {
//         db.User.findOne({
//             where: {
//                 id: req.session.user.id
//             },
//             include: [db.Pod]
//         }).then(userData => {
//             const userDataJSON = userData.toJSON()
//             console.log(userDataJSON)
//             res.render('profile', { user: userDataJSON })
//         })
//     } else {
//         res.redirect("/")
//     }
// })

// Error page
router.get("/error", (req, res) => {
    res.render("error", { user: req.session.user })
})

module.exports = router