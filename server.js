//----EXPRESS CONFIG
const express = require('express');
const app = express();


//----IMPORT ROUTES
const usersRoutes = require('./routes/users/authRoutes');


//----CONFIG DATABASE
const dbConfig = require('./configs/Mongo');
dbConfig();
 


//----ROUTES CONFIG

app.use('/api' , usersRoutes)





app.listen(3000 , (req , res) =>{
console.log('Server Connected')
})