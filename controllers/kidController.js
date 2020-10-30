const express = require('express');
const router= express.Router();
const db = require('../models');

router.get("/", (req, res) => {
    db.Kid.findAll().then(kids => {
        res.json(kids)
    })
})

router.post("/", (req, res) => {
    if (req.session.user) {
        db.Kid.create({
            first: req.body.first,
            last: req.body.last,
            school: req.body.school,
            grade: req.body.grade,
            UserId: req.session.user.id
        }).then(newKid => {
            newKid.addPod(req.body.KidId);
            res.json(true);
            console.log(newKid);
        }).catch(err => {
            console.log(err);
            res.status(500).end();
        })
    } else {
        res.status(401).send("You're not logged in")
    }
})

router.delete("/:id",(req,res)=>{
    if(req.session.user){
        db.Kid.findOne({
            where:{
                id:req.params.id
            }
        }).then(kid=>{
            if(kid.UserId===req.session.user.id){
                db.Kid.destroy({
                    where:{
                        id:req.params.id
                    }
                }).then(delKid=>{
                    res.json(delKid)
                })
            } else {
                res.status(401).send("This is not your Kid")
            }
        })
    } else{
        res.status(401).send("You're not logged in")
    }
})

// router.put("/:id",(req,res)=>{
//     if(req.session.user){
//         db.Kid.findOne({
//             where:{
//                 id:req.params.id
//             }
//         }).then(kid=>{
//             if(!kid){
//                 return res.status(404).send("Kid doesn't exist")
//             }
//             else if(kid.UserId===req.session.user.id){
//                 db.Kid.update({
//                      first: req.body.first,
//                      last: req.body.last,
//                      school: req.body.school,
//                      grade: req.body.grade,
//                 },{
//                     where:{
//                         id:req.params.id
//                     }
//                 }).then(editKid=>{
//                     res.json(editKid);
//                 }).catch(err=>{
//                     res.status(500).send("Please try again later")
//                 })
//             } else {
//                 res.status(401).send("This is not your Kid")
//             }
//         })
//     } else{
//         res.status(401).send("You're not logged in")
//     }
// })


module.exports = router;