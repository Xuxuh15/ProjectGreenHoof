const mongoose = require('mongoose'); 
const {Schema} = mongoose; 

const playerSchema = new Schema({

    name: {
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
        default: 'PLAYER'
    }, 
    credential:{
        type: String,
        required: true,
        uppercase: true,
        enum: ['ADMIN','STAFF','PLAYER'],
        default: 'PLAYER'

    },
    exercisePrograms:[{
        type: Schema.Types.ObjectId,
        ref: 'ExerciseProgram',
        default: []

    }], 
    positiion:{
        type: String,
        uppercase: true,
        required: true, 
        enum: ['GK','CB','LB','RB','CDM','MF','CAM','ST','WG']
    }, 
    playerNotes:[{
        type: Schema.Types.ObjectId, 
        ref: 'PlayerNote', 
        default: []
    }], 
    exerciseRecords:[{
        type: Schema.Types.ObjectId,
        ref: 'ExerciseRecord',
        default: []
    }], 
    personalRecords: [{
        type: Schema.Types.ObjectId,
        ref: 'PersonalRecord',
        default: []
    }], 
    fitnessLevel:{
        type: String,
        required: true,
        uppercase: true,
        enum: ['FIT','INJURED','SICK'],
        default: 'FIT'
    }
    

},{timestamp: true}); 

const Player = mongoose.model('Player', playerSchema);
module.exports = Player; 