const router = require('express').Router();
const User = require('../models/User');
const Cell = require('../models/Cell')
// var csrf = require('csurf');


router.get('/login',(req,res)=>{
    res.render('Login')
})
router.get('/register',(req,res)=>{
    res.render('Register')
})

router.post('/login',(req,res)=>{
    
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

router.get('/manage',(req,res)=>{
    res.render('managecells')
})
router.post('/addcell',(req,res)=>{
    Cell.find({cell: req.body.cellId})
    .then((found)=>{
        if(found.cell){
            console.log("Cell Id is already in use")
        }else{
            const newcell = new Cell({
                cell: req.body.cellId
            })
            newcell.save()
            .then((saved)=>{
                console.log(`Saved ${saved}`)
            }).catch((err)=>{
                console.log(`Error: ${err}`)
            })
        }
    })
    .catch((error)=>{
        console.log(`Error Finding: ${error}`)
    })
})

module.exports = router;