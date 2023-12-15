const mongoose = require('mongoose'); 
const {Schema} = mongoose; 


const exerciseProgramSchema = new Schema({

    name:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true,
        default: new Date()
    },
    description:{
        type: String,
        required: true,
    }, 
    exerciseEntries:[{
        type: Schema.Types.ObjectId,
        ref: 'ExerciseEntry',
        default: []
    }],
    players:[{
        type: Schema.Types.ObjectId,
        ref: 'Player',
        default:[]
    }], 
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'Staff', 
        required: true
    }, 



})