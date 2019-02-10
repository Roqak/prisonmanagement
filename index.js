const express = require('express');
const app = express();
const port = 3000
var request = require('request')
const mongoose = require('mongoose')
var expressHbs = require('express-handlebars');
var bodyParser = require('body-parser')
const user = require('./routes/user')
const inmate = require('./routes/inmate')
let flash = require('connect-flash');
var passport = require('passport')
var validator = require('express-validator');
//const userr = require('./models/User')
const LocalStrategy = require('passport-local').Strategy;
var session      = require('express-session'); 

mongoose.connect("mongodb://akin:akinkunmi1@ds137550.mlab.com:37550/prison")
.then(()=>{
    console.log("successfully connected to the db")
})
.catch((err)=>{
    console.log(`Error connecting to database ${err}`)
})
require('./config/passport');

app.use(bodyParser.urlencoded({ extended: false }))

app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');
// app.use(passport.initialize());
// app.use(passport.session());
app.use(session({
    key: 'user_sid',
    secret: 'goN6DJJC6E287cC77kkdYuNuAyWnz7Q3iZj8',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use(validator());
app.use(flash());
app.use(passport.initialize());
// passport.use(new Strategy(
//     function(username, password, cb) {
//         db.users.findByUsername(username, function(err, user) {
//           if (err) { return cb(err); }
//           if (!user) { return cb(null, false); }
//           if (user.password != password) { return cb(null, false); }
//           return cb(null, user);
//         });
//       }));
// app.use(new LocalStrategy(
//     function(email, password, done) {
//       userr.findOne({ email: email }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         if (!user.verifyPassword(password)) { return done(null, false); }
//         return done(null, user);
//       });
//     }
//   ));
app.get('/',(req,res)=>{
//     var url = 'https://foo.chat-api.com/message?token=83763g87x';
// var data = {
//     phone: '2347034967425', // Receivers phone
//     body: 'Hello, Andrew!', // Сообщение
// };
// // Send a request
// request({
//     url: url,
//     method: "POST",
//     json: data
// });
    res.render('index',{title:"Home"})
})
app.use('/user',user)
app.use('/inmate',inmate)

app.use(function(req, res, next){
	res.locals.login = req.isAuthenticated();
	res.locals.session = req.session;
	next();
})

app.listen(port,()=>{
    console.log(`running on port ${port}`)
})