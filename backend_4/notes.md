### Basic folder setup
#### 1:- npm init
#### 2:- create git repo and link the code
#### 3:- create folder public>temp 
#### 4:- create .gitkeep 
#### 5:- create .gitignore
#### 6:- create .env and .env.sample
#### 7:- create src folder and files(touch app.js constants.js index.js)
#### 8:- install nodemon npm i -D nodemon and change "dev": "nodemon src/index.js" in package.json
#### 9:- create folder in src (controllers(functionality), db(database connection logic),middleware(in between check),models(schema),routes(api routes),utils(utilities like file upload),)
#### 10:- install prettier (npm i -D prettier) and add file name (.pretierrc)
#### 11:- install dotev npm i dotenv and mongoose and express (npm i mongoose express dotenv)


### Database connection (MongoDB)
#### 1: Add MONGODB_URI in env from mongodb atlas (remove end slash from the URI)
#### 2:- go to constant file and write database name
#### 3:- Database connect can be done by 2 approach 
- All code in index.js 
#### or 
- Database connection in DB folder and make modular
### NOTE:- ALWAYS KEEP THE DATABASE CONNECTION IN TRY-CATCH AND IN ASYNC-AWAIT
#### 4:- import mongoose , write Imediate executable function (IEFI)
#### FIRST APPROACH
```
import mongoose from "mongoose";
import {DB_NAME} from './constants'; 

(async ()=>{
    try{
        //after he url We need to add our database name after '/' therefore 
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

    }catch(error){
        console.log("ERROR",error)
        throw err
    }

})()
```
#### SECOND APPROACH
```
----------------- db > index.js
import dotenv from "dotenv"
import {DB_NAME} from "../constant.js";

const connectDB = async()=>{
    try{
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log("DATABASE CONNECTED", ${connectionInstance.connection.host})
    }catch(error){
        console.log("MONGODB CONNECTION FAILED", error)
        process.exit(1)
    }
} 
export default connectDB()

------------------ index.js
import dotenv from "dotenv"
import connectDB from "./db/index.js"

dotenv.config({
    path: '/env'
})

connectDB();



```
###  Custom API REsponse and Error Handling
#### database is connected in db > index.js but we are going to listen it in src > index.js
### Express
### - 1: Request :- how data is coming and how to handle 
- option 1: req.params(whenever we get data from url it comes from params)
- option 2: req.body(configuration for data coming from body)
- Sometimes data is collected from cookies 
### - 2: Response :- how data we have to send 
#### step 1: install cookie-parser (npm i cookie-parser), cors(crose origin resource sharing) (npm i cors)
### Whenever we use "app.use" It is mainly for Middleware
#### add cors in app.js
```
app.js
app.use(cors({
    origin: process.env.CORS_ORIGIN,

}))

```
### We need to do some settings for the data as it will come from multiple source
```
app.use(express.json({limit: "16kb"}))
```
### When we get data from url we have issues that url convert special character
```
configuration to handle that conversion
app.use(express.urlencoded({extended: true, limit:"16kb"}))
configuration to store files (pdf,images) we make public assests
app.use(express.static("public"))
```
### Use of cookiePrser :- we can access and set the cookie in the browser
## Middleware
### We create asyncHandler.js in utils to handle async function so we dont have to write the async await again and again just for the connection of database ...we Create Wrapers
#### utils > asyncHandler.js //for not writing try-catch again and again
```
const asyncHanler = (reqHandler) =>{
    (req,res,next)=>{
        Promise.resolve(reqHandler(req,res,next)).catch((err)=> next(err))
    }
}
```
### Handle error and response format 
### Nodejs (API Error)
#### Handled our error in proper standared format
```
class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong",
        errors=[],
        statck="",
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success= false
        this.errors = errors

        if(stack){
            this.stack =stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}
export {ApiError}
```
## Middleware to check if we get error it should be pass through ApiError

```
```
### User and Video model with hooks and JWT in Advance
#### file in model folder "user.model.js" and "video.model.js"()
```
user.model.js
import mongoose , {Schema} from "mongoose"

const userSchema = new Schema(
    {
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,//cloudinary
        required: true,
    },
    coverImage: {
        type: String, //cloudinary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken:{
        type: String,
    }
},
{
    timestamps: true,
}
)


export const User = mongoose.model("User", userSchema)
```
#### video.model.js

#### Small things: watchHistory makes project complex for this we install special package "npm i mongoose-aggregate-paginate-v2" this package allow you to write aggregation queries
```
videoSchema.plugin(mongooseAggregatePaginate)
```

```
import mongoose ,{ Schema} from "mongoose";
const videoSchema = new Schema(
    {
       videoFile:{
        type: String,
        required: true,
       }, 
       thumbnail:{
        type: String,
        required: true,
       }, 
       title:{
        type: String,
        required: true,
       },
       description:{
        type: String,
        required: true,
       },
       duration:{
        type: Number,
        required: true,
       },   
       views:{
        type: Number,
        default:0,
       }, 
       isPublished:{
        type: Boolean,
        default: true
       },
       owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
       },
    },
    {
        timestamps:true,
    }
)

export const Video = mongoose.model("Video", videoSchema)
```
## what to do? when we are saving data before that take password and encrypt it
#### packages:- 1. bcrypt.(help ypou to hash your password) 2. bcryptjs  & JWT(json Web token for cryptography token) :- npm i bcrypt jsonwebtoken
#### user.model.json
### How to Encrypt?
#### Direct encryption is not possible:- therefore we need you take help from mongoose
#### 1:- Pre hook:- just before saving data we can run this hook with code
### in pre callback dont use this "()=>{}" because in JS we dont get this context ...we need database context so therefore use async function(next) {} ///what to do? when we are saving data before that take password and encrypt it
```
// bcryption syntax 
in the pre hook 
userSchema.user("action", async callbackfunction (next(as this is a middleware)){
    this.varibale = bcrypt("on whom to apply bcryption" , "how many round to salt the data")
})
```
### Password encrypt 
#### encrypt only when change password is asked so apply if condition
```
userSchema.pre("save", async function(next){
    if(!this.isModified("password)) return next(); // negative check
    this.pasword = brcypt.hash(this.password, 10 )
    next()
})
```
### now make methods so when ever we import user we need to check with user also
### Custom methods
```
userSchema.methods.isPasswordCorrect = async function (password){
    // check password
    return await bcrypt.compare(password,this.password)
}
```
### JWT
### What is JWT ? :- Bearer token (whoever have this token I will pass the entry )
#### In .env 
### ACCESS TOKEN
#### We are using cookie and sessions both we have strong security 
```
ACCESS_TOKEN_SECRET=deTcgiE5DBYhYx0WKBkX78xg9q0MUMGyFY5lWHsqCLi9QC3Z3mxFI9KCqUMcwILL

ACCESS_TOKEN_EXPIRY=1d
```
### REFRESH_TOKEN_SECRET(logic later) //stored in database
```
REFRESH_TOKEN_SECRET=deTcgiE5DBYhYx0WKBkX78xg9q0MUMGyFY5lWHsqCLi9QC3Z3mxFI9KCqUMcwILL

REFRESH_TOKEN_EXPIRY=10d
```
#### Genrating Access and Refresh token using mongoose methods
#### Access token
```
userSchema.methods.generateAccessToken = function() {
    jwt.sign(
        // payload 
        {
            _id: this._id, //from mongodb
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        // access token
        process.env.ACCESS_TOKEN_SECRET,
        //Object for expiry
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY

        }
    )

}
```
#### Refresh token
```
userSchema.methods.generateRefreshToken = function() {
    jwt.sign(
        //payload
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
```
### How to upload file in backend? (make seperate utility file for file upload for reuse and )
#### Services we are going to use (cloudinary,) npm(express-fileupload || multer(we are going to use this))
#### npm i cloudinary and npm i multer
### Cloudinary 
#### download cloudinary
### Strategy 
- we will get user do file upload (through multer)
- Cloudinary is Service (which just upload the file on server)
- we will take file from user using multer and keep the file temporary in local server
- then using cloudinary we will take the file from local server and upload it on server

### Why this 2 steps?
- In case of fail the file on uploading on server ... get get a chance to retry to upload file on server if required (good for production level)
### Cloudinary file goal:- file will come from file system
- will get file from local server
- remove from local server
#### we are using fs from node which is file system help to open , read , write file
#### imp for us unlink:- used to remove the file 
### This code may have bug as this is just prepration
```
import {v2 as cloudinary} from "cloudinary"
import fs from fs



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfully
        console.log("file is uploaded on cloudinary", response.url);
        return response
    } catch (error) {
        // remove the locally saved temporary file as the upload operation got failed
        fs.unlinkSync(localFilePath)
        return null;
    }

}

export {uploadOnCloudinary}
```
### Using multer we create multer
### middleware > multer.middleware.js
```
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, "./public/temp")
    },
    filename: function(req, file,cb){
        cb(null,file.originalname)
    }
})

export const upload = multer(
    {
        storage,
    }
)
```
# ---------------------Setup done----------------------
## HTTP crash course | http Methods | http headers
### HTTP [Hyper Text Transfer Protocol]
#### we use when 2 server client and server want to comunicate with each other
#### keywords: -URL (Uniform Resource Locator), URI(uniform Resource Identifier),URN (Unidorm Resource Name)
## What are HTTP Headers
#### When we send http request with that we need to send some more information [metadata -----> key-value send along with request & response]
## What headers do?
#### Used for caching(if data available in cache),authentication(headers,bearer token), manage state(user state guest user, cart )
## Types of headers
- Request Headers -----> data from Client
- Response Headers -----> data from Server
- Representation headers -----> which encoding/compression
- Payload Headers -----> data(_id,email)
## Most Common Headers
- Accept: what type of data it accept mostly in server (format ex:-application /json)
- User-Agent (from which application request came ex:- which browser, postman?)
- Authorization :- (ex:- Bearer, JWT token)
- Content-type:- (image,pdf?)
- Cookie:- 
- Cache-control:- (time to keep data)
### CORS header
- Access-Control-Allow-Origin:- from which source are allowed
- Access-Control-Allow-Credentials
- Access-Control-Allow-Method
### Security
- Cross-Origin-Embedder-Policy
- Cross-Origin-Opener-Policy
- Cross-Security-Policy
- X-XSS-Protection
## HTTP METHODS
### Basic set of operations that can be used to interact with server
- GET : retrive a resource
- HEAD : No message body (response headers only)
- OPTIONS : what operations are available
- TRACE : loopback test (get same data) 
- DELETE : remove a resource
- PUT : replace a resource
- POST : interact with resource (mostly added)
- PATCH : change part a resource
## HTTP STATUS CODE
- 1XX : Informational
- 2XX : Success
- 3XX : Redirection
- 4XX : Client error
- 5XX : Server error
#### ------------------------
- 100: Continue
- 102: Processing
- 200: ok
- 201: Created
- 202: accepted
- 307: temporary redirect
- 308: permanent redirect
- 400: Bad request
- 401: Unauthorized
- 402: Payment required
- 404: Not found
- 500: Internal Server Error
- 504: Gateway time out
####
####
####
####
####
####
####
####
####
####
####
####
####
####
####
####
####
####
####
####

