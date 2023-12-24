const mongoose = require('mongoose')
const dbConfig = () => {mongoose.connect('mongodb://localhost:27017/asodb', {useNewUrlParser: true, useUnifiedTopology: true})
.then(
    console.log('Mongo Connected')
).catch((e) =>{
    console.log(e)
})}

module.exports = dbConfig



