const User = require("../../models/user")
const generateToken = require("../../helpers/generateTokens")


const SignUp = async(req,reply)=>{
    const user = await User.create({...req.body})
    if(user){
        reply.code(201).send({
            message:"User created successfully",
            UserDate:{
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                token: generateToken(user._id)
            }
        })
    }else{
        console.log("error while creating".bgRed)
        return reply.code(404).send({error:"Status failed",message:"Failed to create user into database",statusCode:404})
    }
}

module.exports = {SignUp}