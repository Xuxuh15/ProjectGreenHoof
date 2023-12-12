//imports
const app = require("./app/app"); 
const http = require('http'); 
const PORT =  3045; 


//creates new server.Uses app to process requests and send responses
const server = http.createServer(app); 

//server
server.listen(PORT, (err)=>{
    if(err){
        console.log(err); 
    }
    console.log(`Server is running on ${PORT}`); 
}); 
