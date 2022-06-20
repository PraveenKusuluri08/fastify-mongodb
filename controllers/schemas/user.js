const {
  SignUp,
  SignIn,
  getLoggedInUserData,
} = require("../handlers/userHandler")
const mongoose = require("mongoose")
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
              _id: { type: "string" },
              email: { type: "string" },
              firstName: { type: "string" },
              token: { type: "string" },
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
        email: { type: "string" },
        password: { type: "string" },
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
      404: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: SignIn,
}

const getSingleUserOpts = {
  schema: {
    tags: ["User"],
    summary: "Get current loggedin user data",
    response: {
      200: {
        type: "object",
        properties: {
          _id: { type: mongoose.Schema.Types.ObjectId },
          firstName: { type: "string" },
          email: { type: "string" },
          pic: { type: "string" },
        },
      },
      404: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
}

module.exports = { signUpOptions, signinOptions, getSingleUserOpts }
