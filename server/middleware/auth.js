import { verifyToken } from "../config.js";
import { User } from "../models/user.js";

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }


        const decoded = await verifyToken(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({ message: "Invalid token. User not found." });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token." });
    }
};

export { authenticateToken };
