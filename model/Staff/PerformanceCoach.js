const mongoose = require('mongoose');
const {Schema} = mongoose; 

const performanceCoachSchema = new Schema({

    name:{
        type: String, 
        required: true
    },
    dateOfBirth:{
        type: String, 
        required: true
    }, 
    email:{
        type: String,
        required: true,
    }, 
    password:{
        type: String,
        required: true
    }, 
    role:{
        type: String,
        required: true,
        uppercase: true, 
        enum: ['PLAYER','PERFORMANCECOACH','COACH','ASSISTANTCOACH','FYSIO'],
        default: 'PERFORMANCECOACH'
    }, 
    credential:{
        type: String,
        required: true,
        uppercase: true,
        enum: ['ADMIN','STAFF','PLAYER']

    }



},{timestamp: true}); 

const PerformanceCoach = mongoose.model('PerformanceCoach', performanceCoachSchema); 
module.exports = PerformanceCoach; 