import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const schema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    profilePic : {
        type : String,
        default : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    }
}, {timestamps : true})

schema.pre("save", async function () {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
});
  

const User = mongoose.model("User", schema)

export {User}