const mongoose = require('mongoose');
const schema = mongoose.Schema;


const userSchema = new schema ({
username:{
    type:String , 
    required:[true , 'username is required'],
    lowercase:true
} , 
password: {
    type:String , 
    required:[true , 'username is required'],  
    minLength: [6 , 'Password must be at least 6 characters long']
} , 
role: {
    type:String,
    enum:['member' , 'owner' , 'admin'],
    default:'member'
} ,

group:[{type:schema.Types.ObjectId, ref:'Group'}] , 

messages:[{type:schema.Types.ObjectId , ref:'Message'}]

})


module.exports = mongoose.model('User' , userSchema)

