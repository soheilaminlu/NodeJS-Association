//----EXPRESS CONFIG
const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json())


//---USE COOKIE-PARSER
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//----IMPORT ROUTES
const usersRoutes = require('./routes/users/AuthRoutes');


//----CONFIG DATABASE
const dbConfig = require('./configs/Mongo');
dbConfig();
 


//----ROUTES CONFIG

app.use('/api' , usersRoutes)





app.listen(3000 , (req , res) =>{
console.log('Server Connected')
})