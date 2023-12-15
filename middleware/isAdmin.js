const Admin = require('../model/Admin/adminSchema');
const AsyncHandler = require('express-async-handler'); 
const PerformanceCoach = require('../model/Staff/PerformanceCoach');
const Player = require('../model/Players/Player'); 

const isAdmin = AsyncHandler(async(req,res,next)=>{
    //userAuth is custom parameter in the header
    const userID = req?.userAuth?._id; 
    let userFound; 
    if(userID && req.userAuth.role == "PERFORMANCECOACH"){
        userFound = await PerformanceCoach.findById(userID); 
    }
    else if (userID && req.userAuth.role == "PLAYER"){
        userFound = await Player.findById(userID); 
    }
    
    if( userFound?.credential == "ADMIN"){
        next(); 
    }
    else{
        next(new Error('User must be an admin to proceed.')); 
    }

}); 

module.exports = isAdmin; 