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

export { generateToken };