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
  const existedUser = User.findOne({
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
  const coverImageLocalPath = req.files?.coverImageLocalPath[0]?.path;

  //check if user has send it or not.
  if (!avatarLocalPath) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //2.upload it on cloudinary.
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    return res.status(400).json({ message: "Avatar filed is required" });
  }

  //6.
  const user = await User.create({
    //db on another continent.
    username: username.toLowerCase(),
    fullName,
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await user.findById(username._id).select(
    "-password -refreshToken" //select inclydes those fileds which dont need to send.  and User DB it returns a _id bydefault.
  );

  if (!createdUser) {
    return res
      .status(500)
      .json({ message: "something went wrong while registring the User" });
  }

  return res.status(201).json({ createdUser: "user registered successfully" });
});

export default registerUser;
