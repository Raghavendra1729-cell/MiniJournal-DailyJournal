import mongoose from "mongoose";
import express from "express";
import "dotenv/config";
import connectDb from "./connection.js";
import authRouter from "./routes/auth-routes.js";
import journalRouter from "./routes/journal-routes.js";
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/auth", authRouter);
app.use("/entries", journalRouter);



//app listen
app.listen(process.env.PORT, () => {
    connectDb();
    console.log(`port live at ${process.env.PORT}`);
});