import mongoose from "mongoose";




const connectDb = () =>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log(`Server Connected to the database`);
    }).catch((err) =>{
    console.log("an error occured while connecting to the database");
    })
}
    

export default connectDb;