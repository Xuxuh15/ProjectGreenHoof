const mongoose = require('mongoose'); 
const {Schema} = mongoose; 



const exerciseSchema = new Schema ( {

    name: {
        type: String,
        required: true
    }, 
    movementPattern:{
        type: String, 
        uppercase: true,
        enum: ['UPPERBODY','LOWERBODY','CORE','CHANGEOFDIRECTION','ACCELERATION','SPEED','JUMPING','GENERIC'],
        default: 'GENERIC',
        required: true
    },
    video:{
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }, 
    description:{
        type: String, 
        required: true
    }
},
    {timestamps: true}
); 

const Exercise = mongoose.model('Exercise', exerciseSchema); 
module.exports = Exercise; 






