import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app= express()

app.use(cors({
    //cors option
    origin: process.env.CORS_ORIGIN,
    credentials:true,
}))

//configuration for data conversion, url data handling, and files handling
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import

import userRouter from './routes/user.routes.js'


// routes declaration
// we are using middleware because we have segregated the routes so to bring that we need to use middleware so use use "app.use"
//https://localhost:3000/users--------->userRouter file
app.use("/api/v1/users", userRouter)


export { app }