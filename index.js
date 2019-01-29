const express = require('express');
const app = express();
const port = 3000
const mongoose = require('mongoose')
var expressHbs = require('express-handlebars');
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.get('/',(req,res)=>{
    res.render('index',{title:"jjdjd"})
})


app.listen(port,()=>{
    console.log(`running on port ${port}`)
})