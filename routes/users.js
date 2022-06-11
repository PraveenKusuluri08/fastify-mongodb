const { signUpOptions, signinOptions } = require("../controllers/schemas/user")

const userRoutes = (fastify, options, done) => {
  fastify.post("/api/signup", signUpOptions)

  fastify.post("/api/signin", signinOptions)
  done()
}

module.exports = userRoutes
