//----EXPRESS CONFIG
const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json())


//---USE COOKIE-PARSER
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//----IMPORT ROUTES
const authRoutes = require('./routes/users/AuthRoutes');
const membersRoutes = require('./routes/users/MembersRoutes')
const ownersRoutes = require('./routes/users/OwnersRoutes');
const adminRoutes = require('./routes/users/AdminRoutes');



//----CONFIG DATABASE
const dbConfig = require('./configs/Mongo');
dbConfig();
 


//----ROUTES CONFIG
app.use('/api' , authRoutes)
app.use('/api/members' , membersRoutes)
// app.use('/api/owner' , ownersRoutes)
app.use('/api/admin' , adminRoutes)


 


app.listen(3000 , (req , res) =>{
console.log('Server Connected')
})