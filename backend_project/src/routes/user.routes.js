import { Router } from "express";
import {registerUser, loginUser , logoutUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyjwt } from "../middlewares/auth.middlewares.js";

const router = Router(); //like app from express


// user registration route
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);


// user login route
router.route("/login").post(loginUser);


// user logout route
router.route("/logout").post(  verifyjwt  , logoutUser);



export default router;
