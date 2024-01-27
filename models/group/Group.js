const mongoose = require('mongoose');
const schema = mongoose.Schema;

const groupSchema = new schema ({
    name:String,
    owner: {type:schema.Types.ObjectId , ref:'User' , required:true} ,
    members: [{type:schema.Types.ObjectId , ref:'User'}],
    joinRequests:{type:schema.Types.ObjectId , ref:'JoinRequest'} 
})

module.exports = mongoose.model('Group' , groupSchema);