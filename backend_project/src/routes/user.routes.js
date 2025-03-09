import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
} from "../controllers/user.controllers.js";
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
router.route("/logout").post(verifyjwt, logoutUser);

// user refresh token route
router.route("/refresh-token").post(refreshAccessToken) ;

// password-reset route
router.route("/password-reset").post(verifyjwt , changeCurrentPassword);

export default router;
