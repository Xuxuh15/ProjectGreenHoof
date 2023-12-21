//require Player model---access to database
const Player = require('../model/Players/Player'); 
const AsyncHandler = require('express-async-handler'); 


const isPlayer = AsyncHandler(async (req, res, next)=>{
    const userId = req?.userAuth?._id; 
    const userFound = await Player.findById(userId);

    if(!userFound){
        next(new Error('Player could not be found'));
    }
    
    //check if user is a teacher
    if(userFound?.role === "PLAYER"){
        next();
    }
    else{
        next(new Error('Access denied. Not a player'));
    } 
}); 

module.exports = isPlayer; 