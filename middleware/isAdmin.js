//middleware function to check if user is an active admin
const isAdmin = async(req,res,next)=>{
    //userAuth is custom parameter in the header
    if(req.userAuth.active){
        next(); 
    }
    
    else{
        next(new Error('User must be an admin to proceed.')); 
    }

}; 

module.exports = isAdmin; 