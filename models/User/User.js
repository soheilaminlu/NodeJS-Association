const mongoose = require('mongoose');
const schema = mongoose.Schema;


const userSchema = new schema ({
username:{
    type:String , 
    required:true,
    lowercase:true
} , 
password: {
    type:String , 
    required:true,  
    minLength: 6
} , 
role: {
    type:String,
    enum:['member' , 'owner' , 'admin'],
    default:'member'
} ,

group:
{
    groupId:{
        type:schema.Types.ObjectId,
        ref:'Group'
    }
} , 
messages: {
userId:{
    type:schema.Types.ObjectId ,
    ref:'User'
}
}
})


module.exports = mongoose.model('User' , userSchema)

