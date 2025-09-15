import jwt from "jsonwebtoken";

const generateToken =async (id) => {
    try{
        const token = await jwt.sign({id},process.env.JWT_SECRET,{expiresIn : '30d'})
        return token
    }
    catch(err){
        throw new Error("ERROR IN GENERATING TOKEN")
    }
};

const verifyToken = async (token, secret) => {
    try {
        const decoded = await jwt.verify(token, secret);
        return decoded;
    } catch (err) {
        throw new Error("INVALID TOKEN");
    }
};

export { generateToken, verifyToken };