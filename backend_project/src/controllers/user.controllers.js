import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../services/cloudniary.js";
import { jwt } from "jsonwebtoken";

// user registration system

const registerUser = asyncHandler(async (req, res) => {
  //1. get user details from frontend ;
  //2. validation - check for empty
  //3. check if user already existed - email, username
  //4. check for file - coverimage , avatar
  //5. upload to cloudinary.
  //6. create user object - create entry in DB.
  //7. remove password and refreshToken field from response.
  //8. check for user creation
  //9. return response.

  //1.
  const { username, fullName, email, password } = req.body;

  console.log("email: ", email); //just to check

  //2.
  // if (fullName === "") {
  //   return res.status(400).json({ message: "All fields are required" });
  // }
  //or
  if (
    [username, fullName, email, password].some(
      (fields) => fields?.trim() === ""
    )
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //3.

  // const existedUser = User.findOne({ email });
  //or
  const existedUser = await User.findOne({
    $or: [{ email }, { username }], //through this we can check multiple fields at one time.
  });

  if (existedUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  //4.in user routes.
  //5.
  //1.get the localFile Path .
  const avatarLocalPath = req.files?.avatar[0]?.path;
  console.log("req.files :", req.files);
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  //check if user has send it or not.
  if (!avatarLocalPath || !coverImageLocalPath) {
    return res.status(400).json({ message: "All  fields are required" });
  }

  //2.upload it on cloudinary.
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  console.log("avatar: ", avatar);

  if (!avatar) {
    return res.status(400).json({ message: "Avatar filed is required" });
  }
  if (!coverImage) {
    return res.status(400).json({ message: "Cover Image filed is required" });
  }

  //6.
  const user = await User.create({
    //db on another continent.
    username: username.toLowerCase(),
    fullName,
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage.url,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" //select inclydes those fileds which dont need to send.  and User DB it returns a _id bydefault.
  );

  if (!createdUser) {
    return res
      .status(500)
      .json({ message: "something went wrong while registring the User" });
  }

  return res.status(201).json({ createdUser: "user registered successfully" });
});

// user login system

const loginUser = asyncHandler(async (req, res) => {
  //todos for login user

  //1. get login data from frontend - req.body
  //2. check through which input   , user is trying to login - email or username
  //3. check if user exists in database
  //4. check if password is correct
  //5. create token for user - refresh and access token .
  //6. send token to frontend - token is send in cookie .
  //7. send response to frontend - user logged in successfully

  //1
  const { username, email, password } = req.body;

  //2
  if (!(username || email))
    return res.status(400).json({ message: "Username or email is required" });

  //3
  const user = await User.findOne({
    //user is instance of db user
    $or: [{ email }, { username }],
  });

  if (!user) return res.status(404).json({ message: "User does not exist" });

  //4
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect)
    return res.status(401).json({ message: "Password is incorrect" });

  //5. import token functions from usermodels.
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  //now we need to save the refreshToken in the database.
  user.refreshToken = refreshToken;
  await user.save();

  //remove password and refreshToken field from response.
  const loggedInUser = User.findById(user._id).select(
    //this is for the response check .
    "-password -refreshToken"
  );

  // Convert Mongoose document to plain JavaScript object
  const userObject = loggedInUser.toObject;

  //6. //6. send token to frontend - token is send in cookie  //7. //cookie options
  const options = {
    httpOnly: true,
    secure: true,
  };

  //7. send response to frontend - user logged in successfully
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      User: userObject,
      accessToken,
      refreshToken,
      message: "User logged in successfully",
    });
});

// user logout system

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "User logged out successfully" });
});

//error
// The "Converting circular structure to JSON" error typically occurs when you try to stringify an object that contains circular references. This can happen when you try to send a Mongoose document directly in a JSON response.

// To fix this, you should convert the Mongoose document to a plain JavaScript object using the .toObject() method before sending it in the response. Let's update the loginUser function to address this issue:

//refresh access token system
const refreshAccessToken = asyncHandler(async (req, res) => {
  //1. get refresh token  - from cookie
  //2. check if refresh token exists
  //3. verify the refresh token
  //4. get user from refresh token
  //5. create new access token
  //6. send new access token to frontend

  //1
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken)
    return res.status(401).json({ message: "unauthorized request" });

  //3
  const decodedRefreshToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  //4

  const user = await User.findById(decodedRefreshToken?._id);

  if (!user) return res.status(401).json({ message: "Invalid refresh token" });

  // verify if the incoming refresh token is same as the one saved in the database.
  if (incomingRefreshToken !== user?.refreshToken) {
    res.status(401).json({ message: "Refresh token is expired or used" });
  }

  //5
  const options = {
    httpOnly: true,
    secure: true,
  };
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  //6
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({ accessToken, refreshToken }, "Access token refreshed successfully");
});

//changing password

const changeCurrentPassword = asyncHandler((req, res) => {
  //1. get current password and new password from frontend
  //2. access user from req.user
  //3. check if current password is correct
  //4. change the password
  //5. send response to frontend

  const { currentPassword, newPassword } = req.body;

  const user = User.findById(req.user?._id);
  if (!user) return res.status(404).json({ message: "User does not exist" });

  const isPasswordCorrect = user.isPasswordCorrect(currentPassword);

  if (!isPasswordCorrect)
    return res.status(400).json({ message: "Current password is incorrect" });

  user.password = newPassword; // here we have only set it  , not save

  user.save({ validateBeforeSave: false });

  return res.status(200).json({ message: "Password changed successfully" });
});


// getCurrentUser 
const getCurrentUser = asyncHandler( (req , res)=>{
  //1. get user from req.user
  //2. send response to frontend

  return res
  .status(200)
  .json(
    200,
    req.user ,
    "Current user fetched successfully"
  );
} ); 


// update user profile

const updateAccountDetails = asyncHandler( (req,res)=>{

  //1. get updated details from frontend
  //2. access user from req.user
  //3. check if user exists
  //4. update user details
  //5. send response to frontend

const { username , fullName , email } = req.body;

  if(!username || !fullName) return res.status(400).json({message : "All fileds are required"});
   
//2
const user = User.findById(req.user?._id).select("-password -refreshToken") ;
if(!user) return res.status(404).json({message : "User does not exist"});

//or
// const user = User.findByIdAndUpdate(
//   req.user?._id ,
//   {
//     $set : { username , fullName : fullName }
//   } ,
//   {new : true} //to get the updated user data in response
// )
//   .select("-password -refreshToken") ;


//4
user.username = username ;
user.fullName = fullName ;

User.save({validateBeforeSave : false});

//5
return res.status(200).json({message : "User details updated successfully"})

} );




export { registerUser, loginUser, logoutUser, refreshAccessToken , changeCurrentPassword , getCurrentUser , updateAccountDetails};
