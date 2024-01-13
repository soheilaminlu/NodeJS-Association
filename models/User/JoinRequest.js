const mongoose =require('mongoose')
const schema = mongoose.Schema

const joinRequestSchema = new schema({
    userId:{
        type:schema.Types.ObjectId,
        ref:'User',
        required:true

    } , 
    groupId: {
        type:schema.Types.ObjectId,
        ref:'Group',
        required:true
    },
    status:{
        type:String,
        enum:['reject' , 'pending' , 'accept'],
        default:'pending'
    }
    
})

module.exports = mongoose.model('JoinRequest' , joinRequestSchema)