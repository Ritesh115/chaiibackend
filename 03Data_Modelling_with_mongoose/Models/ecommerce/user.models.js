import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
  },
  email : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
  },
  password : {
    type : String,
    required : true,
  }
} , {timestamps : true})

export const User =  mongoose.model('User' , userSchema)





// Mongoose schemas support a timestamps option. If you set timestamps: true, Mongoose will add two properties of type Date to your schema:

// createdAt: a date representing when this document was created
// updatedAt: a date representing when this document was last updated