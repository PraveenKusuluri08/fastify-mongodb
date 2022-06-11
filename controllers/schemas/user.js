const { SignUp, SignIn } = require("../handlers/userHandler")
const joi = require("joi")

const signUpOptions = {
  schema: {
    tags: ["User"],
    response: {
      201: {
        type: "object",
        properties: {
          message: { type: "string" },
          UserDate: {
            type: "object",
            properties: {
              _id: { type: "string", example: "some document id" },
              email: { type: "string", example: "example@domain.com" },
              firstName: { type: "string", example: "user_name" },
              token: { type: "string", example: "token" },
            },
          },
        },
      },
      404: {
        type: "object",
        properties: {
          error: { type: "string" },
          message: { type: "string" },
          statusCode: { type: "number" },
        },
      },
    },
  },
  handler: SignUp,
}

const signinOptions = {
  schema: {
    tags: ["User"],
    summary: "User signin to the application",
    body: {
      type: "object",
      properties: {
        email: { type: "string", example: "example@domain.com" },
        password: { type: "string", example: "123456" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          token: { type: "string" },
          user: {
            type: "object",
            properties: {
              _id: { type: "string" },
              email: { type: "string" },
              firstName: { type: "string" },
            },
          },
        },
      },
      404:{
        type:"object",
        properties:{
            message:{type:"string"}
        }
      }
    },
  },
  handler:SignIn
}

module.exports = { signUpOptions, signinOptions }
