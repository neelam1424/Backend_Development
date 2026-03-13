import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { response } from 'express'

// 1:- creating user registration function 
// 2:- wrap the whole function with asyncHandler 
// 3:- within the asynHandler we create one more async function
// 4:- give status as response

const registerUser = asyncHandler( async (req,res) => {
  
    // step 1:- Get user details from frontend
    // step 2:- validation - not empty
    // step 3:- check if user already exists [username, email]
    // step 4:- check for images , check for avatar (multer check)
    // step 5:- upload them to cloudinary, avatar(upload cloudinary check)
    // step 6:- create user object [as in mongodb object are uploaded]- create entry in db [creation call(.create)]
    // step 7:- remove password and referesh token field from response[because we dont want to send this info as response]
    // step 8:- check for user creation
    // step 9:- return response


    //step 1:- [We get all details in resq or body]
    const {fullName, email, username,password} = req.body
    console.log("email",email)

    //step2:- validation

    // if(fullName === ""){
    //     throw new ApiError(400, "Full name required")
    // }
    if(
        [fullName, email, username, password].some((field) => 
        field?.trim()==="")
    ){""
        throw new ApiError(400,"All fields are required")
    }
    // step 3:- exist or not
    //import User from db
    const existedUser = User.findOne({
        //operators to check multiple fields
        $or: [{ username }, { email }]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    // step 4: image and avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath= req.files?.coverImage[0]?.path;

    //check avatar
    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    // upload files on cloudinary
    const avatar= await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    //check again uploaded or not
    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }


    //create object
    //how to make db entry
    const User = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),

    })

    //check user is not empty by finding it in db and remove refresh token

    const createdUser = await User.findById(User._id).select(
        "-password -refreshToken"
    )

    // check user is created or not
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    //send response call ApiResponse function
    return res.status(201).json(
        new ApiResponse(200, createdUser , "User registered succesfully")
    )





})

export {registerUser}