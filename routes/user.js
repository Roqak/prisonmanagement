// 'use strict'
const router = require('express').Router();
const User = require('../models/User');
const Cell = require('../models/Cell')
const passport = require('passport')
const express = require('express')
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

const isLoggedIn = function (req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/login')

}
router.get('/login',(req,res)=>{
    res.render('Login',{csrfToken: req.csrfToken(),title:'Login'})
})
router.get('/register',(req,res)=>{
    res.render('Register',{csrfToken: req.csrfToken(), title:'Register'})
})

router.post('/login', passport.authenticate('local.signin', {
    failureRedirect: '/user/register',
    successRedirect: '/inmate/manage',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        console.log("User Logged In");
        res.redirect('/');
    }
});
// router.post('/login',(req,res)=>{
    
// })

router.post('/register',(req,res)=>{
    User.find({email:req.body.email})
    .then((myuser)=>{
        if(myuser.email){
            console.log(`user found`)
            console.log(myuser)
        }else{
            const usser = new User({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            })
            usser.save()
            .then((result)=>{
                console.log(`Sucess saving user ${result}`)
            })
            .catch((err)=>{
                console.log(`Error saving user ${err}`)
            });
        }
    })
    .catch((error)=>{
        console.log(`Error registering user ${error}`);
    })
    
})

// router.post('/signin', passport.authenticate('local.signin', {
//     failureRedirect: '/login',
//     failureFlash: true
// }), function (req, res, next) {
//     console.log(req.body.email +" and " + req.body.password);
//     if (req.session.oldUrl) {
//         var oldUrl = req.session.oldUrl;
//         req.session.oldUrl = null;
//         res.redirect(oldUrl);
//     } else {
//         res.send('hello');
//     }
// });

router.get('/manage',isLoggedIn,(req,res)=>{
    console.log(req.user);
    res.render('managecells',{csrfToken: req.csrfToken(),
    cell: generateId()})
});

router.post('/addcell',(req,res)=>{
    Cell.find({}, {}, { sort: { 'created_at' : -1 } })
    .then((found)=>{
        if(found.cell){
            console.log("Cell Id is already in use");
        }else{
            const newcell = new Cell({
                cell: req.body.cellId
            });
            newcell.save()
            .then((saved)=>{
                console.log(`Saved ${saved}`);
            }).catch((err)=>{
                console.log(`Error: ${err}`);
            });
        }
    })
    .catch((error)=>{
        console.log(`Error Finding: ${error}`);
    });
});

const generateId = ()=>{
    Cell.find({})
    .then((cell)=>{
        console.log(`${cell}`);
    })
    .catch((error)=>{
        console.log(`${error}`);
    })
}

router.get('/addcell/:cellId',(req,res)=>{
    let newCell = new Cell({
        cell: req.params.cellId
    })
    newCell.save()
    .then((suceess)=>{
        res.send("Successfully Registered a NEW Cell")
    })
    .catch((err)=>{
        res.send("Error Sending Data")
    })
})

module.exports = router;