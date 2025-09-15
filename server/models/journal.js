import mongoose from "mongoose";



const schema = mongoose.Schema({
    date : {
        type : Date,
        required : true,
        default : Date.now
    },
    content : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
}, {timestamps : true})



const Journal = mongoose.model("Journal", schema)

export {Journal}