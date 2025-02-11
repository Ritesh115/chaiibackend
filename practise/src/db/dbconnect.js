import mongoose from 'mongoose';
import 'dotenv/config';


const dbconnect = async function () {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);

    console.log(`db connected successfully !! DB_HOST: ${connectionInstance.Connection.host}`);
  } catch (error) {
    console.log('db connection failed' , error);
    process.exit(1);
  }
}

export { dbconnect };