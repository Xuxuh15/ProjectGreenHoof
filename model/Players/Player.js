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
    fitnessLevel:{
        type: String,
        required: true,
        uppercase: true,
        enum: ['FIT','INJURED','SICK'],
        default: 'FIT'
    }
    

},{
    timestamp: true,
    //allow virtuals to be parsed into JSON and Object
    toJSON: {virtuals: true},
    toObject: {virtuals: true}

}); 

//define virtuals
//when populating virtuals we can always add additonal queries to filter results
//links player to their personal notes. Allows us to later populate a players notes
playerSchema.virtual('playerNotes',{
    ref: 'PlayerNote',
    localField: '_id',
    foreignField: 'player'
}); 
//links player to their exercise records. Allows us to later populatr a player's exercise records. 
playerSchema.virtual('exerciseRecords',{
    ref: 'ExerciseRecord',
    localField: '_id',
    foreignField: 'player',
    justOne: false
}); 
//links player to their personal record. Allows us to later populate a player's personal records. 
playerSchema.virtual('personalRecords',{
    ref: 'PersonalRecord',
    localField: '_id',
    foreignField: 'player'
}); 

const Player = mongoose.model('Player', playerSchema);
module.exports = Player; 