const { createTodoOpts, getAllTodosOpts, getAllTodosOfUserOpts, updateTodoOpts, completeTodoOpts} = require("../controllers/schemas/todos")
const {
  createTodoHandler,
  getAllTodosHandler, getTodos, updateTodo, completeTodo,
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

const getAllTodosOfUser= {
  schema:getAllTodosOfUserOpts,
  handler:getTodos
}

const updateTodoResolver={
  schema:updateTodoOpts,
  handler:updateTodo
}

const completeTodoResolver={
  schema:completeTodoOpts,
  handler:completeTodo
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

  fastify.get("/api/getallusertodos",{
    preHandler:fastify.auth([endPoint]),
    ...getAllTodosOfUser
  })

}

module.exports = TodoRoutes
