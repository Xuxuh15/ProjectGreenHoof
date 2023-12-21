const mongoose = require('mongoose'); 
const {Schema} = mongoose; 

const exerciseEntrySchema = new Schema({

    name:{
        type: String, 
        required: true
    }, 
    //the goal of the exercise
    focus:{
        type: String,
        uppercase: true, 
        enum: ['POWER','STRENGTH','MOBILITY','STABILITY','FORM','GENERIC'],
        default: 'GENERIC'
    }, 
    //exercise
    exercise:{
        type: Schema.Types.ObjectId, 
        ref: 'Exercise',
        required: true
    },
    //exercise instructions
    instructions:{
        weight: Number, 
        reps: Number,
        sets: Number, 
        time: Number,
        instruction: String,
        
    }, 
    //notes for individual improvement. Player-based; optional field
    playerNotes:[{
        type: Schema.Types.ObjectId, 
        ref: 'PlayerNote'
    }], 
    //a player's personal record. Optional field
    personalRecords:[{
        type: Schema.Types.ObjectId,
        ref: 'PersonalRecord'
    }], 
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'PerformanceCoach',
        required: true
    }, 
    hidden:{
        type: Boolean, 
        required: true, 
        default: false
    }

},
{timestamps: true}); 

const ExerciseEntry = mongoose.model('ExerciseEntry', exerciseEntrySchema); 
module.exports = ExerciseEntry; 



