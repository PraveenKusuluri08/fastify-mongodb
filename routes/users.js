const {signUpOptions}= require("../controllers/schemas/user")


const userRoutes = (fastify,options,done)=>{
    fastify.post("/api/signup",signUpOptions)

    done()
}

module.exports = userRoutes