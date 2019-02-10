const router = require('express').Router();
const User = require('../models/User');
var passport = require('passport');
// var csrf = require('csurf');
const LocalStrategy = require('passport-local').Strategy;


router.get('/login',(req,res)=>{
    res.render('Login')
})
router.get('/register',(req,res)=>{
    res.render('Register')
})

router.post('/login',(req,res)=>{
    passport.use(new Strategy(
        function(username, password, cb) {
            User.find({email: req.body.email}, function(err, user) {
              if (err) { return cb(err); }
              if (!user) { return cb(null, false); }
              if (user.password != password) { return cb(null, false); }
              return cb(null, user);
            });
          }));
})

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

router.get('/manage',(req,res)=>{
    res.render('managecells')
})

module.exports = router;
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/signin');
}