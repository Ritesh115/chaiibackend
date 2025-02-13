import { Router } from "express";
import registerUser from "../controllers/user.controllers.js"


const router = Router()  //like app from express

router.route("/register").post(registerUser)





export default router;