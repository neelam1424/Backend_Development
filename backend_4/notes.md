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

