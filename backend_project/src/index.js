// require('dotenv').config({path: './.env'})
import 'dotenv/config'
import connectDB from "./db/index.js" ;
import stopDBConnection from "./db/stopDBconnection.js" ;
import app from "./app.js" ;

connectDB() 
//its a async call so it returns a promise.
.then( ()=>{
    app.listen(process.env.PORT || 3000 , ()=> {
        console.log(`server is running on port : ${process.env.PORT}`);
    });
} )
.catch( (error)=>{
   console.log("MONGODB connection FAILED " , error);
} )

// This is the entry point of the application. It connects to the database and starts the server.