const express = require('express');
const app = express();
const port = 3000
var request = require('request')
const mongoose = require('mongoose')
var expressHbs = require('express-handlebars');
var bodyParser = require('body-parser')
const user = require('./routes/user')
const inmate = require('./routes/inmate')

mongoose.connect("mongodb://akin:akinkunmi1@ds137550.mlab.com:37550/prison")
.then(()=>{
    console.log("successfully connected to the db")
})
.catch((err)=>{
    console.log(`Error connecting to database ${err}`)
})


app.use(bodyParser.urlencoded({ extended: false }))

app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');


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

app.listen(port,()=>{
    console.log(`running on port ${port}`)
})