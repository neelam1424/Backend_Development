import {Router} from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from '../middleware/multer.middleware.js'

const router = Router()

// which route to take user to
//this takes to '/users/register'
//what to do on this url?
// ---> we do the method post where the function from userController is implemented function name is registerUser------> so it calls user.controller.js
//https://localhost:3000/users--------->userRouter file
//https://localhost:3000/users/register--------> calls registerUser from file user.controller.js



router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)



export default router