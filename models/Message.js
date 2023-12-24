const mongoose = require('mongoose')
const schema = mongoose.Schema

const messageSchema = new schema ({
    type:{
        String,
        required:true
    } , 
    sender: {type:schema.Types.ObjectId , ref:'User'},
    group: {type:schema.Types.ObjectId , ref:'Group'},
    createdAt:{ type:Date , default:Date.now()} 
});

module.exports = mongoose.model('Message', messageSchema);