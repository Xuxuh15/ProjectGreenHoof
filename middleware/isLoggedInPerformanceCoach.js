const verifyToken = require('../utils/verifyToken');
const AsyncHandler = require('express-async-handler'); 
//require Performance Coach model---access to database
const PerformanceCoach = require('../model/Staff/PerformanceCoach');

const isLoggedInPerformanceCoach = AsyncHandler(async (req, res, next)=>{
    //get token from header
    const headerObj = req.headers; 
    //optional chaining 
    const token = headerObj?.authorization?.split(" ")[1];
    //verify token
    const verifiedToken = verifyToken(token);
    if(verifiedToken){ 
        //find Admin --- exclude password in returned user
        const user = await Player.findById(verifiedToken.id).select('name email role');
        //saver user in request body 
        req.userAuth = user;
        //move onto next middleware
        next();   
    }
    //if the token is invalid, throw a error and pass it with next
    else{
        const err = new Error('Invalid token');
        next(err);
    } 
}); 

module.exports = isLoggedInPlayer; 