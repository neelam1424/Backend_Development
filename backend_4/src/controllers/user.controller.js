import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"



//access and refresh token methods

const genrateAccessAndRefreshTokens= async(userId)=>{
try {
    const user = await User.findById(userId)

    const accessToken = user.generateAccessToken()
    const refrehToken = user.generateRefreshToken()

    // value in object
    user.refreshToken=refrehToken
    await user.save({validateBeforeSave: false})

    return {accessToken, refrehToken}


    
    
} catch (error) {
    throw new ApiError(500, "Something went wrong while generating refresh and access token")
}
}






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
    console.log("BODY",req.body);

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
    const existedUser = await User.findOne({
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
    if(!avatarLocalPath){
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
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),

    })

    //check user is not empty by finding it in db and remove refresh token

    const createdUser = await User.findById(user._id).select(
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

const loginUser = asyncHandler( async(req,res)=>{

    // 1:- from req body bring data
    // 2:- check username or email
    // 3:- find the user in db
    // 4:- when user found :- check password
    // 5:- when password correct:- acces and referesh token generate(user.model)
    // 6:- send cookie[secure cookie]
    // 7:- response send to user

    const {email,username,password} = req.body


    if(!username && !email){
        throw new ApiError(400, "Username or email is required")
    }

    const user = await User.findOne(
        {
            $or: [{username},{email}]
        }
    )
    if(!user){
        throw new ApiError(404,"user does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
         throw new ApiError(401,"Invalid user credentials")
    }

    const {accessToken, refreshToken}=await genrateAccessAndRefreshTokens(user._id)

    //send to cookie
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    // cookie
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken , options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In successfully"

        )
    )
})


 // logout
    // 1:- remove cookie
    // 2:- remove refresh and access token
const logoutUser = asyncHandler(async(req,res)=>{
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    refreshToken: undefined
                }
            },
            {
                new: true
            }
        )
        
        const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"))
})

const refreshAccessToken = asyncHandler(async(req,res)=>{
    const incomingRefreshToken = refreshAccessToken.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401, "unauthorized request")
    }

    const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
    )
})

export {registerUser, loginUser, logoutUser}