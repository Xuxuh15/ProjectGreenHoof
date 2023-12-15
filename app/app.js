require('dotenv').config(); 
const express = require('express'); 
const {json} = require('express'); 
const morgan = require('morgan');
const bodyParser = require('body-parser'); 
const path = require('path'); 


const app = express(); 


//Middlewares
//Log the routes to terminal
app.use(morgan('dev')); 
//Turn incoming payload into JSON file
app.use(express.json()); 
//body-parser
app.use(bodyParser.urlencoded({extended: false})); 
//serve static files from public folder
app.use(express.static(path.join('../',__dirname,'public'))); 




module.exports = app; 



