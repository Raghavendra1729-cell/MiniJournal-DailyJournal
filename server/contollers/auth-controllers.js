import { User } from "../models/user.js";
import { generateToken } from "../config.js";
import bcrypt from "bcrypt";
const register = async (req, res) => {
    const userToken = req.cookies?.token;
    if (userToken) {
        try{
            const verified = await verifyToken(userToken,process.env.JWT_SECRET);
            return res.status(400).json({ message: "User already logged in" ,user : verified});
            return;
        }catch(err){
            
        }
    }
    const { name,userName, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ name,userName, email, password });
    await newUser.save();
    const token = await generateToken(newUser._id);
    res.cookie("token", token, { httpOnly: true,sameSite : "strict",maxAge : 30 * 24 * 60 * 60 * 1000 });
    res.status(201).json({ message: "User created successfully", user: newUser,token });
}

const login = async (req, res) => {
    const userToken = req.cookies?.token;
    if (userToken) {
        try{
            const verified = await verifyToken(userToken,process.env.JWT_SECRET);
            return res.status(400).json({ message: "User already logged in" ,user : verified});
            return;
        }catch(err){
            
        }
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid password" });
    }
    const token = await generateToken(user._id);
    res.cookie("token", token, { httpOnly: true,sameSite : "strict",maxAge : 30 * 24 * 60 * 60 * 1000 });
    res.status(200).json({ message: "User logged in successfully", user: user,token });
}


export { register, login };