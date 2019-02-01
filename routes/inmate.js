const router = require('express').Router();
const Inmate = require('../models/Inmate');
const Cell = require('../models/Cell');
var passport = require('passport');
var csrf = require('csurf');



function generateInmateId(){
    Inmate.find({})
    .then((inmate)=>{
        if(inmate){
            console.log(inmate)
        }
    })
}

router.post('/add',(req,res)=>{
    const usser = new Inmate({
        name: req.body.name,
        age: req.body.age,
        maritalStatus: req.body.maritalStatus,
        nextofKinName: req.body.nextofKinName,
        nextofKinAge: req.body.nextofKinAge,
        nextofKinMail: req.body.nextofKinMail,
        cell: req.body.cell,
        InmateId: generateInmateId()
    })
    usser.save()
    .then((result)=>{
        console.log(`Sucess saving inmate ${result}`)
        Cell.find({cell_id:req.body.cell})
        .then((cell)=>{
            if(cell){

            }
        })

    })
    .catch((err)=>{
        console.log(`Error saving inmate ${err}`)
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