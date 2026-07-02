
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import {app} from "./app.js";

dotenv.config();

connectDB()
.then (()=>{
    const port = process.env.PORT || 8000;
    app.listen(port,()=>{
        console.log(`server is running at port : ${port}`);
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed!!",err);
})











/*
import express from "express";

const app=express()

( async() => {
    try {
        mongoose.connect('${process.env.MONGODB_URL}/${DB_NAME}')
        app.on("error",(error)=>{
            console.log("ERR: ",error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log('App is listening on port ${process.env.PORT}');
            
        })

    } catch(error){
        console.error("ERROR: ",error)
        throw err
    }
})()*/