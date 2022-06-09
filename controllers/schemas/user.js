const {SignUp} = require("../handlers/userHandler")
const joi = require("joi")

const signUpOptions ={
    schema:{
        tags:["User"],
        response:{
            201:{
                type:'object',
                properties:{
                    message:{type:"string"},
                    UserDate:{
                        type:"object",
                        properties:{
                            _id:{type:"string",example:"some document id"},
                            email:{type:"string",example:"example@domain.com"},
                            firstName:{type:"string",example:"user_name"},
                            token:{type:"string",example:"token"}
                        }
                    }
                }
            },
            404:{
                type:"object",
                properties:{
                    error:{type:"string"},
                    message:{type:"string"},
                    statusCode:{type:"number"}
                }
            }
        }
    },
    handler:SignUp
}

module.exports={signUpOptions}