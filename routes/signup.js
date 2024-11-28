const student = require('../models/student');
const teacher = require('../models/teacher')

const express = require('express');
const path = require('path')
const router = express.Router(); // if handling multiple api, can use router instead of app. Router is one of the module in express.

const {createToken} = require('../middlewares/authenticate')


//student table api

router.get('/student-table',(req,res)=>{
    student.find().then((response)=>{
        return res.send(response)
    }).then(()=>{console.log("student-table-got")})
    .catch((err)=>{console.log("student table-not shown",err)})
})

//teacher table api

router.get('/teacher-table',(req,res)=>{
    teacher.find().then((resp)=>{
        return res.send(resp)
    }).then(()=>{console.log("teacher-table-got")})
    .catch((err)=>{console.log("teacher table-not shown",err)})
})

router.get('/signup',(req,res)=>{
     res.sendFile(path.join(__dirname,'..','templates', 'signup.html'))
})
router.get('/login',(req,res)=>{
    //  res.sendFile(path.join(__dirname,'..','templates', 'login.html'))
    res.render('login.html')
})

// student table UI
router.get('/view-student',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','templates','view-student.html'))
})

// teacher table UI
router.get('/view-teacher',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','templates','view-teacher.html'))
})

router.post('/login',(req, res, next)=>{
    const name = req.body.name
    const password = req.body.password
    const selectedValue = req.body.selectedValue
    res.json('OK login')

    if(selectedValue === "teacher"){
        teacher.findOne({name:name}).then((res)=>{
            if(res){
                console.log("sent to JWT");
                next()
            }
            else{
                console.log("Invalid credentials");
                res.status(404).json({code:404,message:"No user found",data:null})
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    else if(selectedValue === "student"){
        student.findOne({name:name}).then((res)=>{
            if(res){
                console.log("sent to JWT");
            }
            else{
                console.log("Invalid credentials");
            }
        })
    }
    else{
        console.log("Please select appropriate");
    }
}, createToken)
router.post('/signup',(req,res)=>{
    const name = req.body.name
    const number = req.body.number
    const password = req.body.password
    const userType = req.body.userType
    const designation = req.body.designation
    const idnum = req.body.idnum
    const classno = req.body.classno
    const marks = req.body.marks

    // res.status(200).json({code:200,message:"user found"}) // response returns promise (in browser console)

    if(userType === "teacher"){
        teacher.insertMany(
            {
                name:req.body.name,
                number: req.body.number,
                password: req.body.password,
                designation:req.body.designation,
                idnum:req.body.idnum
            }).then((response)=>{
                return res.redirect('http://localhost:8000/login')
            })
    }
    else if(userType === "student"){
        student.insertMany({
                name:req.body.name,
                number: req.body.number,
                password: req.body.password,
                class: req.body.classno,
                marks: req.body.marks
        }).then((response)=>{
            return res.redirect('http://localhost:8000/login')
        })
    }
    else{
        console.log("Invalid")
    }

    console.log(req.body)

})

module.exports = router;

