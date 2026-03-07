
//Connect database
import dotenv from 'dotenv';
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})




connectDB();






























/*
First approach to connect database...we are goin with the second one
//IEFI function from JS
import mongoose from mongoose;
import {DB_NAME} from "./constants";

(async ()=>{
    try{
        //database connect await it
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

    }catch(error){
        console.log("ERROR", error);
        throw err
    }
})()
    */
