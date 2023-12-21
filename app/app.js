require('dotenv').config(); 
const express = require('express'); 
const {json} = require('express'); 
const morgan = require('morgan');
const bodyParser = require('body-parser'); 
const path = require('path'); 




const app = express(); 

//Routers
const adminRouter = require('../routes/Staff/adminRouter');


//Middlewares

//Log the routes to terminal
app.use(morgan('dev')); 
//Turn incoming payload into JSON file
app.use(express.json()); 
//body-parser
app.use(bodyParser.urlencoded({extended: false})); 
//serve static files from public folder
app.use(express.static(path.join('../',__dirname,'public'))); 


//Admin routes
app.use('/api/v1/admin', adminRouter); 






module.exports = app; 



