const router = require('express').Router();
const Inmate = require('../models/Inmate');
const Cell = require('../models/Cell');
var passport = require('passport');
var csrf = require('csurf');
const faker = require('faker')


var csrfProtection = csrf();
router.use(csrfProtection);

const isLoggedIn = function (req,res,next){
    if(req.isAuthenticated()){
        console.log('pass')
        return next()
    }
        req.session.oldUrl = req.url;
        res.redirect('/user/login')
    

}

function generateInmateId(){
    // Inmate.find({})
    // .then((inmate)=>{
    //     if(inmate){
    //         console.log(inmate)
    //     }
    // })
    return "1";
}

router.post('/add',(req,res)=>{
    // let fakeinmate = faker.
    const usser = new Inmate({
        name: req.body.name,
        age: req.body.age,
        maritalStatus: req.body.maritalStatus,
        nextofKinName: req.body.nextofKinName,
        nextofKinAge: req.body.nextofKinAge,
        nextofKinMail: req.body.nextofKinMail,
        // cell: req.body.cell,
        InmateId: generateInmateId()
    })
    usser.save()
    .then((result)=>{
        console.log(`Sucess saving inmate ${result}`)
        // Cell.find({cell_id:req.body.cell})
        // .then((cell)=>{
        //     if(cell){

        //     }
        // })
        res.redirect('/inmate/manage');

    })
    .catch((err)=>{
        console.log(`Error saving inmate ${err}`);
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
                console.log(`Sucess saving user ${result}`);
            })
            .catch((err)=>{
                console.log(`Error saving user ${err}`);
            })
        }
    })
    .catch((error)=>{
        console.log(`Error registering user ${error}`);
    })
    
})

router.post('/generate',(req,res)=>{
    let fake_data = faker.Helpers.createCard();
    let fake_data2 = faker.Helpers.createCard();
    const usser = new Inmate({
        name: fake_data.name,
        age: fake_data.age,
        maritalStatus: req.body.maritalStatus,
        nextofKinName: req.body.nextofKinName,
        nextofKinAge: req.body.nextofKinAge,
        nextofKinMail: req.body.nextofKinMail,
        // cell: req.body.cell,
        InmateId: generateInmateId()
    })
})

router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/user/login',
    successRedirect: '/inmate/manage',
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
router.get('/add',(req,res)=>{
    res.render('addInmate',{csrfToken: req.csrfToken()});
})

router.get('/manage',(req,res)=>{
    Inmate.find({})
    .then((result)=>{
        if(result){
            console.log(result.length);
            res.render('manageInmate',{inmates: result, csrfToken: req.csrfToken()});

        }
    });
});
router.get('/delete/:id',(req,res)=>{
    Inmate.findByIdAndDelete({_id:req.params.id})
    .then((deleted)=>{
        console.log(deleted);
        res.redirect('/inmate/manage');
    })
    .catch((error)=>{
        console.log(error);
    });
});
router.post('/updateinmate',(req,res)=>{
    Inmate.findOneAndUpdate({name: req.body.name},{nextofKinName: req.body.nextofKinName})
    .then((result)=>{
        res.redirect('/manage',{csrfToken: req.csrfToken()});
    })
    .catch((err)=>{
        console.log("error")
    })

})

module.exports = router;