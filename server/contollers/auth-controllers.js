import { User } from "../models/user.js";
import { generateToken } from "../config.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
    const { name,userName, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ name,userName, email, password });
    await newUser.save();
    const token = await generateToken(newUser._id);
    res.cookie("token", token, { httpOnly: true,sameSite : "strict",path:"/",maxAge : 30 * 24 * 60 * 60 * 1000 });
    res.status(201).json({ message: "User created successfully", user: newUser,token });
}

const login = async (req, res) => {
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
    res.cookie("token", token, { httpOnly: true,sameSite : "strict",path:"/",maxAge : 30 * 24 * 60 * 60 * 1000 });
    res.status(200).json({ message: "User logged in successfully", user: user,token });
}

const logout = async (req, res) => {
    res.clearCookie("token", { httpOnly: true, sameSite: "strict", path: "/" });
    res.status(200).json({ message: "User logged out successfully" });
}

const getProfile = async (req, res) => {
    res.status(200).json({ user: req.user });
}

export { register, login, logout, getProfile };