import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../services/cloudniary.js";

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
  if (!username || !email)
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
  const loggedInUser =  User.findById(user._id).select(  //this is for the response check .
    "-password -refreshToken" 
  ) ;

  //6.   //7. //cookie options
  const options = {
    httpOnly: true ,
    secure : true ,
  }

    return res
    .status(200)
    .cookie("accessToken" , accessToken , options)
    .cookie("refreshToken" , refreshToken ,options)
    .json(
      {
        User : loggedInUser , accessToken , refreshToken
      },
      'User logged in successfully'
    )


});





 








export { registerUser , loginUser };
