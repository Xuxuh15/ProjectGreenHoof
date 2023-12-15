const mongoose = require('mongoose'); 
const {Schema} = mongoose; 

const exerciseRecordSchema = new Schema({

    player: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    date:{
        type: Date,
        required: true,
        default: new Date()
    }, 
    exercise:{
        type: Schema.Types.ObjectId,
        required: true
    },
    result:{
        weigth: Number,
        reps: Number,
        other: String, 
    }

}); 

const ExerciseRecord = mongoose.model('ExerciseRecord', exerciseRecordSchema); 
module.exports = ExerciseRecord; 
