import mongoose from 'mongoose';
import mongooseaggregatePaginate from 'mongoose-aggregate-paginate-v2';
import bcrypt from 'bcrypt';

const  userSchema = new mongoose.schema({
   username : {
    type : String ,
    required : true ,
    unique : true ,
    lowercase : true ,
    trim : true ,
    index : true, // This is for the search feature ie in search this will show on top.
   },
   email : {
    type : String ,
    required : true ,
    unique : true ,
    lowercase : true ,
    trim : true ,
   },
   fullName : {
    type : String ,
    required : true ,
   trim : true ,
   index : true, 
   },
    avatar : {  //cloudinary url // This is for the profile picture of the user.
      type : String ,
      required : true ,
    },
    coverImage : { //cloudinary url 
      type : String ,
    },
    watchHistory : [ 
      {
      type : mongoose.Schema.Types.ObjectId ,
      ref : 'Video'
      }
  ],
  password : {
    type : String ,
    required : [true , 'Password is required'], //this is custom error message.
  },
  refreshToken : {
    type : String ,
  },

} , { timestamps: true });


userSchema.plugin(mongooseaggregatePaginate);

// This is for the password hashing.
userSchema.pre("save" , async function (next) {
  if(!this.isModified('password')) return next(); //Skip if password is unchanged
  
  this.password = bcrypt.hash(this.password , 8); //// Hash new password
  next();

})





export const User = mongoose.model('User', userSchema);
