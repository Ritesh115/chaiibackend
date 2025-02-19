import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true, //
      index: true, // This is for the search feature ie in search this will show on top. search will be faster.
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      //cloudinary url // This is for the profile picture of the user.
      type: String, //and that url is in string format and stored in the database.
      required: true,
    },
    coverImage: {
      //cloudinary url
      type: String,
      required: true,
    },

    //jaise hi user will watch one video we will push that video in the watchHistory array with it id.
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"], //this is custom error message.
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// This is for the password hashing.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); //Skip if password is unchanged

  this.password = await bcrypt.hash(this.password, 8); //// Hash new password
  next(); //After hashing the password, the middleware calls next() to proceed with saving the document.
});

// This is for the password verification. or login purpose
// This is a custom method that we are creating.
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password); //compare returns a Boolean value.
};

// This is for the jwt  token generation.

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      // payload
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },

    process.env.ACCESS_TOKEN_SECRET,

    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      // payload
      _id: this._id,
    },

    process.env.REFRESH_TOKEN_SECRET,

    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
