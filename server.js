const fastify = require("fastify")({
  ignoreDuplicateSlashes: true,
})
require("dotenv").config()
const DbConnection = require("./Config/db")
fastify.register(require("@fastify/swagger"), {
  routePrefix: "/api/docs",
  exposeRoute: true,
  swagger: require("./swaggerConfig"),
  // swagger: document,
})

fastify.register(require("@fastify/cors"), {
  origin: "*",
})

const colors = require("colors")
DbConnection()
const PORT = process.env.PORT || 8080
console.log(colors.blue("env"), process.env.PORT, PORT)
const userRoutes = require("./routes/users")
fastify.get("/", (req, reply) => {
  reply.code(200).send({ message: "HELLO API" })
})
fastify.register(userRoutes)
fastify.listen(8000, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`App is running in`, `${address}`.red)
})
