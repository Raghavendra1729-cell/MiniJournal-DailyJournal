import mongoose from "mongoose";
import express from "express";
import "dotenv/config";
import connectDb from "./connection.js";

const app = express();


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
    connectDb();
    console.log(`port live at ${process.env.PORT}`);
});