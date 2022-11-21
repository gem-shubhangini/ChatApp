import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 9000;
const connection_url = "mongodb+srv://admin1:Riya@cluster1.wgqe1yy.mongodb.net/?retryWrites=true&w=majority";
app.use(express.json());
app.use(cors())
mongoose.connect(connection_url);

const db = mongoose.connection;
try {
    db.collection("messagecontents").deleteMany( { } );
    console.log("deleted")
 } catch (e) {
    console.log(e);
 }