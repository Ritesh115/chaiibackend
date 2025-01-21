import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  //1 . first field which include the data of user
  {
    username : {
    type : String ,
    required : true , 
    unique : true ,
    lowercase : true,
   },

   email : {
    type : String , 
    required : true,
    unique : true , 
    lowercase : true,
   },

    password : {
    type : String , 
    required : true,
    },
 },

// 2 . second fileds which include the timestamps.
{
  timestamps : true ,
}
)

export const User = mongoose.model('User' , userSchema)


