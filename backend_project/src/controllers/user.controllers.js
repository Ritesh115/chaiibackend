import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  //1. get user details from frontend ;
  //2. validation - check for empty
  //3. check if user already existed - email, username
  //4. check for file - coverimage , avatar
  //5. upload to cloudinary.
  //6. create a entry in DB -user{}
  //7. remove password and refreshToken field from response.
  //8. check for user creation
  //9. return response.

  //1.
  const { username, fullName, email, password } = req.body;

  console.log("email: ", email); //just to check

  //2.
  if (fullName === "") {
    return res.status(400).json({ message: "All fields are required" });
  }
  //or
  if (
    [username, fullName, email, password].some(
      (fields) => fields?.trim() === ""
    )
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //3.
});

export default registerUser;
