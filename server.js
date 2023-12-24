//----EXPRESS CONFIG
const express = require('express');
const app = express();

//----SOCKET IO
const io = require('socket.io');



//----CONFIG DATABASE
const dbConfig = require('./configs/Mongo');
dbConfig();
 


//----ROUTES CONFIG







app.listen(3000 , (req , res) =>{
console.log('Server Connected')
})