const verifyToken = require('../utils/verifyToken');
const AsyncHandler = require('express-async-handler'); 
//require Player model---access to database
const Player = require('../model/Players/Player');

const isLoggedInPlayer = AsyncHandler(async (req, res, next)=>{
    //get token from header
    const headerObj = req.headers; 
    //optional chaining 
    const token = headerObj?.authorization?.split(" ")[1];
    //verify token
    const verifiedToken = verifyToken(token);
    if(verifiedToken){ 
        //find Player --- exclude password in returned user
        const user = await Player.findById(verifiedToken.id).select('name email role position');
        //saver user in request body 
        req.userAuth = user;
        //move onto next middleware. Automatically passes request object
        next();   
    }
    //if the token is invalid, throw a error and pass it with next
    else{
        const err = new Error('Invalid token');
        next(err);
    } 
});

module.exports = isLoggedInPlayer; 