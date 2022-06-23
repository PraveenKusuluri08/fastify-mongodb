

const {createTodoOpts}= require("../controllers/schemas/todos")
const {createTodoHandler} = require("../controllers/handlers/todoHandler");
const endPoint = require("../helpers/endPoint")
const createTodo = {
    schema: createTodoOpts,
    handler: createTodoHandler,
}

const TodoRoutes=(fastify,options,done)=>{
    fastify.register(require("@fastify/auth")).after(() => privateRoutes(fastify))
    done();
}
function privateRoutes(fastify){
    fastify.post("/api/createTodo",{
        preHandler:fastify.auth([endPoint]),
        ...createTodo
    })
}

module.exports= TodoRoutes