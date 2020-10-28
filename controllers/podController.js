const express = require('express');
const router= express.Router();
const db = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

let today = new Date()
today = today.toISOString()
today = today.slice(0, 10)

router.get("/", (req, res) => {
    db.Pod.findAll({
        order: [
            ["date", "DESC"],
            ["time", "DESC"]
        ],
        where: {
            date: {
                [Op.gt]: [today]
            }
        }
    }).then(pods => {
        res.json(pods)
    })
})

router.get("/:id", (req, res) => {
    db.Pod.findAll({
        where:{
            id:req.params.id
        }
    }).then(pod => {
        res.json(pod)
    })
})

router.post("/", (req, res) => {
    if (req.session.user) {
        db.Pod.create({
            name: req.body.name,
            date: req.body.date,
            time: req.body.time,
            zip: req.body.zip,
            contact: req.body.contact,
            note: req.body.note,
            UserId: req.session.user.id
        }).then(newPod => {
            res.json(newPod)
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
        db.Pod.findOne({
            where:{
                id:req.params.id
            }
        }).then(pod=>{
            if(pod.UserId===req.session.user.id){
                db.Pod.destroy({
                    where:{
                        id:req.params.id
                    }
                }).then(delpod=>{
                    res.json(delpod)
                })
            } else {
                res.status(401).send("This is not your Pod")
            }
        })
       
    } else{
        res.status(401).send("You're not logged in")
    }
})


router.put("/:id",(req,res)=>{
    if(req.session.user){
        db.Pod.findOne({
            where:{
                id:req.params.id
            }
        }).then(pod=>{
            if(!pod){
                return res.status(404).send("Pod doesn't exist")
            }
            else if(pod.UserId===req.session.user.id){
                db.Pod.update({
                    name: req.body.name,
                    date: req.body.date,
                    time: req.body.time,
                    zip: req.body.zip,
                    contact: req.body.contact,
                    note: req.body.note
                },{
                    where:{
                        id:req.params.id
                    }
                }).then(editPod=>{
                    res.json(editPod);
                }).catch(err=>{
                    res.status(500).send("Please try again later")
                })
            } else {
                res.status(401).send("This is not your Pod")
            }
        })
       
    } else{
        res.status(401).send("You're not logged in")
    }
})


module.exports = router;