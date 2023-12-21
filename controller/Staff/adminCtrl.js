//Async Handler
const AsyncHandler = require('express-async-handler');
//import PerformanceCoach model
const PerformanceCoach = require('../../model/Staff/PerformanceCoach');
//import Player model
const Player = require('../../model/Players/Player'); 
//to generate a JSON webtoken
const generateToken = require('../../utils/generateToken');
//to verify a token
const verifyToken = require('../../utils/verifyToken');
//require bcrypt to hash password
const bcrypt = require('bcrypt');
//import password helpers
const {isMatched, hashPassword} = require('../../utils/helperMethods');
const Admin = require('../../model/Admin/Admin');




//admin register logic
exports.adminRegisterAdminCtrl = AsyncHandler(async (req, res)=>{
    const {name, email, password,role} = req.body; //data needed for admin model. Default role is admin
    //check if email exists---indicates admin already exists
    const adminFound = await Admin.findOne({email});
    if(adminFound){
        throw new Error("Admin exists");
    }
    //register admin
    const user = await Admin.create({
        name,
        email,
        password: await hashPassword(password),
        role,
        message: "Admin registered successfully!" //mongoose will ignore this extra parameter since it is not part of document schema
    });
        res.status(201).json({
            status: "Successful",
            message: 'Admin successfully created', 
            data: user
        }); 
    
});

//admin login
exports.adminLogInCtrl = AsyncHandler(async(req,res)=>{

const {email,password} = req.body; //get email and password from request

//fethc user from database
const user =  await Admin.findOne({email}); 

//check if user exists
if(!user){
    return res.json({message: "Admin not found. Check enteredt email and try again." });
}

//verify password

const passwordVerified = await isMatched(password, user.password);

if(!passwordVerified){
    return res.json({message: "Invalid login credentials"});
}
else{
     return res.json(
        {
           data: generateToken(user._id),
           message: "Admin logged in successfully"
        });
}
}); 

//returns admin's information
exports.adminGetProfileCtrl = AsyncHandler(async(req,res)=>{
    const user = await Admin.findById(req.userAuth.id).select('name email password role active'); 
    res.status(200).json({
        status: 'Successful', 
        message: 'Admin profile returned',
        data: user
    }); 
}); 

//retrieves all admins in database. Excludes passwords
exports.adminGetAllProfilesCtrl = AsyncHandler(async(req,res)=>{
    //fetch all admin profiles
    const admins = await Admin.find().select('name email role active'); 
    res.status(200).json({
        status: "Successful", 
        message: "Retrieved all admin profiles", 
        data: admins
    }); 
}); 

//admin update admin logic
exports.adminUpdateProfileCtrl = AsyncHandler(async (req, res)=>{
    //grab name, email, and password properties
    const {email, name,role,password,active} = req.body;
    
    //check if inputted email already exists
    const emailExists =  await Admin.findOne({email});

    if(emailExists){
        throw new Error("Email already exists");
    }


    if(password){
        const admin = await Admin.findByIdAndUpdate(req.userAuth._id, {
            name, 
            email,
            role,  
            password: await hashPassword(password),
        },
        {
            new: true, //we want to use the updated data
            runValidators: true,  //insist on validation
        });
        res.status(200).json({
            status: "Successful",
            message: "Admin successfully updated",
            data: admin


        });
    }
});

//admin delete admin logic. Only for testing
exports.adminDeleteAdminCtrl = AsyncHandler(async(req, res)=>{
    const userID = req.params.uid; 

    const userToDelete = await Admin.findByIdAndDelete(userID); 

    if(userToDelete){
        res.status(200).json({
            status: "Successful",
            message: "Admin successfully deleted",
            data: userToDelete
        }); 
    }
    else{
        res.status(404).json({
            status: "Unsuccessful", 
            message: 'Admin could not be found'
        }); 
    }
     
});




