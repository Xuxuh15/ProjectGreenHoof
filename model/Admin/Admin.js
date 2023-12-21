const mongoose = require('mongoose'); 
const {Schema} = mongoose; 



const adminSchema = new Schema({
    name:{
        type: String, 
        required: true, 
    },
    email:{
        type: String, 
        required: true, 
    },
    password:{
        type: String, 
        required: true,
    },
    role:{
        type: String,
        required: true,
        enum: ['PLAYER','PERFORMANCECOACH','COACH','ASSISTANTCOACH','FYSIO'] 
    },
    active:{
        type: Boolean,
        default: true
    }
},{timestamps: true}); 

const Admin = mongoose.model('Admin', adminSchema); 

module.exports = Admin; 

