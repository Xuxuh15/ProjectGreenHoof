const express = require('express'); 
const adminRouter = express.Router(); 
//middleware checks if user is an Admin
const isAdmin = require('../../middleware/isAdmin'); 
const {adminLogInCtrl,adminUpdateProfileCtrl,adminRegisterAdminCtrl,adminGetAllProfilesCtrl,
adminDeleteAdminCtrl,adminGetProfileCtrl} = require('../../controller/Staff/adminCtrl');
//middleware to check if admin is logged in
const isLoggedInAdmin = require('../../middleware/isLoggedInAdmin');


//@desc admin register
//@route POST /FCD-api/v1/admins/register
//@access private

adminRouter.post('/register', adminRegisterAdminCtrl); 

//@desc admin login
//@route POST /FCD-api/v1/admins/login
//@access private
adminRouter.post('/login', adminLogInCtrl); 

//@desc admin get profile
//@route GET /FCD-api/v1/admins/profile
//@access private
adminRouter.get('/profile', isLoggedInAdmin, isAdmin, adminGetProfileCtrl); 

//@desc admin get all profiles
//@route GET /FCD-api/v1/admins/profiles
//@access private
adminRouter.get('/profiles', isLoggedInAdmin, isAdmin, adminGetAllProfilesCtrl); 

//@desc admin update profile
//@route POST /FCD-api/v1/admins/profile/update
//@access private
adminRouter.put('/profile/update', isLoggedInAdmin, isAdmin, adminUpdateProfileCtrl); 

//@desc admin delete profile
//@route  /FCD-api/v1/admins/delete-profile/:uid
//@access private
adminRouter.delete('/delete-profile/:uid', isLoggedInAdmin, isAdmin, adminDeleteAdminCtrl); 

module.exports = adminRouter; 








