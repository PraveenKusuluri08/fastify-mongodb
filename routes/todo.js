const { createTodoOpts, getAllTodosOpts, getAllTodosOfUserOpts, updateTodoOpts, completeTodoOpts, undoTodo, deleteTodo
} = require("../controllers/schemas/todos")
const {
  createTodoHandler,
  getAllTodosHandler, getTodos, updateTodo, completeTodo, undoTodoHandler, deleteSingleTodo,
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

const undoTodoOpts = {
  schema:undoTodo,
  handler:undoTodoHandler
}
const deleteTodoOpts={
  schema:deleteTodo,
  handler:deleteSingleTodo
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

  fastify.put("/api/updateTodo",{
    preHandler:fastify.auth([endPoint]),
    ...updateTodoResolver
  })

  fastify.put("/api/completeTodo",{
    preHandler:fastify.auth([endPoint]),
    ...completeTodoResolver
  })
  fastify.put("/api/undoTodo",{
    preHandler:fastify.auth([endPoint]),
    ...undoTodoOpts
  })
  fastify.delete("/api/deleteTodo",{
    preHandler:fastify.auth([endPoint]),
    ...deleteTodoOpts
  })
}

module.exports = TodoRoutes
