// require('dotenv').config({path: './.env'})
import 'dotenv/config'
import connectDB from "./db/index.js" ;
import stopDBConnection from "./db/stopDBconnection.js" ;


connectDB() ;

stopDBConnection() ;

