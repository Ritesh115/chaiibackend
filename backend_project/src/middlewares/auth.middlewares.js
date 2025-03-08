import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const verifyjwt = asyncHandler(async (req, res, next) => {
  //todos
  //1. access token fromm cookies or headers
  //2. verify token and decode token
  //3. get user data from token and attach to req.user

  try {
    //1
    const token =
      req.cookies?.accessToken ||
      req.headers["Authorization"]?.replace("Bearer ", "");

    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });

    // if token is provided then we will verify token and get user data from token.
    //2.
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("decodedToken", decodedToken); //just for check

    //3. db req to get user data from token.
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken "
    ); //_id is the access token payload.

    if (!user)
      return res.status(401).json({ message: "Unauthorized: No user found" });

    req.user = user; //// Attach user info to request
    next();
  } catch (error) {
    return res.status(401).json(error?.message || "Invalid Access token");
  }
});

export { verifyjwt };
