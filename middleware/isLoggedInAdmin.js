const verifyToken = require('../utils/verifyToken');
//require Player model---access to database
const Admin = require('../model/Admin/Admin');

const isLoggedInAdmin = async (req, res, next)=>{
    //get token from header
    const headerObj = req.headers; 
    //optional chaining 
    const token = headerObj?.authorization?.split(" ")[1];
    //verify token
    const verifiedToken = verifyToken(token);
    if(verifiedToken){ 
        //find Player --- exclude password in returned user
        const user = await Admin.findById(verifiedToken.id).select('name email role active');
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
};

module.exports = isLoggedInAdmin; 