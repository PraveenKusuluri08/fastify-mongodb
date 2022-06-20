const {
  signUpOptions,
  signinOptions,
  getSingleUserOpts,
} = require("../controllers/schemas/user")
const endPoint = require("../helpers/endPoint")
const { getLoggedInUserData } = require("../controllers/handlers/userHandler")

const getUserDataOpts = {
  schema: getSingleUserOpts,
  handler: getLoggedInUserData,
}
const userRoutes = (fastify, options, done) => {
  fastify.post("/api/signup", signUpOptions)

  fastify.post("/api/signin", signinOptions)

  fastify.register(require("@fastify/auth")).after(() => privateRoutes(fastify))
  done()
}
const privateRoutes = (fastify) => {
  fastify.get("/api/getdata", {
    preHandler: fastify.auth([endPoint]),
    ...getUserDataOpts,
  })
}
module.exports = userRoutes
