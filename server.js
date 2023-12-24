const express = require('express');
const dbConfig = require('./configs/Mongo');
const app = express();

//----CONFIG DATABASE
 dbConfig()
 









app.listen(3000 , (req , res) =>{
console.log('Server Connected')
})