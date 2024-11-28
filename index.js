require('./models/db')
const express = require('express');
const app = express()
const signupRoutes = require('./routes/signup');
const bodyParser = require('body-parser');
const cors = require('cors'); // to access cross platform like html to backend
const path = require('path')

app.use(cors())

app.use(express.static(path.join(__dirname,'public'))) //to access every file without mentioning path name. (ex: link to stylesheet in html)
console.log(path.join(__dirname,'public'));


app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(signupRoutes);

//port
app.listen(8000, ()=>{
    console.log('server running in 8000');
})