import express from "express";
import cors from "cors";
import knex from "knex";
import { config } from "dotenv";
import * as sqlite from "node:sqlite";
import {exists} from "node:fs";
import userRoutes from "./routes/userRoutes";
import db from "./db";

//Load environment variables
config();

// Start express application
const app= express();
app.use(cors());
app.use(express.json());

// Include user APIs
app.use("/users", userRoutes);

//Add server to a test route
app.get("/",(req,res)=>{
    res.send("E-commerce project has been started...");
});
//Set up the server port
const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}!`)
});


