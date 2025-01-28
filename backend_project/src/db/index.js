//connecting DB throygh mongoose
import mongoose from "mongoose" ;
import {DB_NAME} from "../constants.js" ;

//DB connect me kuch time to lagta hai is liye async-await.
const connectDB = async () => {
  //ab DB connect hoga problems to a sakta hai is liye try catch use kiya.
      try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        //mongoose.connect gives us a object which contains the connection details.
  //  console.log(connectionInstance);
        console.log(`\n MONGODB connected SUCCESSFULLY !! DB HOST : ${connectionInstance.connection.host} \n`);
        //jyst to know the url of the DB. at the time of deployment .
      } catch (error) {
        console.log("MONGODB connection FAILED " , error);
        process.exit(1)
      } 
}


export default connectDB ;