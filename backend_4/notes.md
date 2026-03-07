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
#### database is connected in bd > index.js but we are going to listen it in src > index.js
### Express
### - 1: Request :- how data is coming and how to handle 
- options 1: req.params(whenever we get data from url it comes from params)
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

