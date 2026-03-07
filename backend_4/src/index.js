
//Connect database
import dotenv from 'dotenv';
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})





connectDB()
.then(()=>{
    //makeing our application listen the database
    app.listen(process.env.PORT || 8000, ()=> {
        console.log(` Server is running at port : ${process.env.PORT}`)
    })
    app.on("error",(error)=>{
            console.log("ERR:",error)
            throw error
            })
})
.catch((err)=>{
    console.log("MONGO DB connection failed!!!", err)
})






























/*
First approach to connect database...we are goin with the second one
//IEFI function from JS
import mongoose from mongoose;
import {DB_NAME} from "./constants";

(async ()=>{
    try{
        //database connect await it
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERR:",error)
            throw error
            })

    }catch(error){
        console.log("ERROR", error);
        throw err
    }
})()
    */
