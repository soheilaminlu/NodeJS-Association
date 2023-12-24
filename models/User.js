const mongoose = require('mongoose');
const schema = mongoose.Schema;


const userSchema = new schema ({
username:String,
password:String,
role: {
    type:String,
    enum:['member' , 'owner'],
    default:'member'
} , 
tokens:String
})

module.exports = mongoose,model('User' , userSchema)

