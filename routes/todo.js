const { createTodoOpts } = require("../controllers/schemas/todos")
const {
  createTodoHandler,
  getAllTodosHandler,
} = require("../controllers/handlers/todoHandler")
const endPoint = require("../helpers/endPoint")

const createTodo = {
  schema: createTodoOpts,
  handler: createTodoHandler,
}

const getAllTodos = {
  schema: getAllTodosOpts,
  handler: getAllTodosHandler,
}

const TodoRoutes = (fastify, options, done) => {
  fastify.register(require("@fastify/auth")).after(() => privateRoutes(fastify))
  done()
}
function privateRoutes(fastify) {
  fastify.post("/api/createTodo", {
    preHandler: fastify.auth([endPoint]),
    ...createTodo,
  })

  fastify.get("/api/gettods", {
    preHandler: fastify.auth([endPoint]),
    ...getAllTodos,
  })
}

module.exports = TodoRoutes
