const mongoose = require('mongoose'); 
const {Schema} = mongoose; 

const playerNoteSchema = new Schema({
    //the player the note belongs to
    player:{
    type: Schema.Types.ObjectId,
    ref: 'Player', 
    required: true
    }, 
    //the date the note was created
    date: {
        type: Date,
        required: true, 
        default: new Date()
    }, 
    //the exercise the notes is about
    exercise: {
        type: Schema.Types.ObjectId,
        ref: 'ExerciseEntry', 
        required: true
    },
    note:{
        type: String,
        required: true
    },
    //the creator of the note 
    createdBy:{
        type: Schema.Types.ObjectId, 
        ref: 'Staff', 
        required: true
    }
}); 

const PlayerNote = mongoose.model('PlayerNote', playerNoteSchema); 
module.exports = PlayerNote; 
