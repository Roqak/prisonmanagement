const router = require('express').Router();
const User = require('../models/User');
var passport = require('passport');
// var csrf = require('csurf');


router.get('/login',(req,res)=>{
    res.render('Login')
})
router.get('/register',(req,res)=>{
    res.render('Register')
})

router.post('/login',(req,res)=>{
    const usser = new User({
        email: req.body.email,
        password: req.body.password
    })
    usser.save()
    .then((result)=>{
        console.log(`Sucess saving user ${result}`)
    })
    .catch((err)=>{
        console.log(`Error saving user ${err}`)
    })
    // console.log(`Your email is ${req.body.email} and your password is ${req.body.password}`)
})

router.post('/register',(req,res)=>{
    usser.find({email: req.body.email})
    .then((found)=>{
        if(found){
            console.log(`user found`)
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
            })
        }
    })
    .catch((error)=>{
        console.log(`Error registering user ${error}`)
    })
    
})

router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/login',
    failureFlash: true
}), function (req, res, next) {
    console.log(req.body.email +" and " + req.body.password);
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.send('hello');
    }
});



module.exports = router;
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/signin');
}