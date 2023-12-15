const { default: mongoose } = require('mongoose');
const mognoose = require('mongoose'); 

//database connection function
const dbConnect = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL,{
            serverSelectionTimeoutMS: 6000
        }); 
        console.log('Connected to database'); 
    }
    catch(err){
        console.log('Database connection failed:', err); 
    }
}

//initialize database connection
dbConnect(); 
