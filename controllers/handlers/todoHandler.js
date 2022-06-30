const Todo = require("../../models/todo")
const {boolean} = require("joi")
const ObjectId = require('mongodb').ObjectId;
const createTodoHandler = async (req, reply) => {
    const {title, description} = req.body
    try {
        let count = await Todo.count({title})
        if (count > 0) {
            let todoData = await Todo.findOne({title})
            return reply.code(404).send({message: "Todo already exists", todoData})
        }

        let createTodo = await Todo.create({
            title,
            description,
            uid: req.user._id,
        })
        reply.code(201).send(createTodo)
    } catch (err) {
        reply.code(404).send({message: "Failed to create todos"})
    }
}

const getAllTodosHandler = async (req, reply) => {
    const {status} = req.query
    try {
        let todos = await Todo.find({
            $and: [{status: {$eleMatch: {$eq: status}}}, {uid: req.user._id}],
        })
        reply.code(200).send(todos)
    } catch (e) {
        reply.code(404).send({message: "Failed to get todos"})
    }
}

const getTodos = async (req, reply) => {
    try {
        let todo = await Todo.find({uid: req.user._id})

        reply.code(200).send(todo)
    } catch (err) {
        reply.code(404).send({message: "Failed to get todos"})
    }
}

const updateTodo = async (req, reply) => {
    const {todoId} = req.query
    let _id = new ObjectId(todoId)
    let {title, description} = req.body

    let count = await Todo.count({_id, status: true, uid: req.user._id})
    if (count < 0) {
        return reply.code(404).send({message: "Failed to update todo!! Todo is may be completed"})
    }
    try {

        let todo = await Todo.findOneAndUpdate({_id: todoId, uid: req.user._id, status: true}, {
            title,
            description,
            status: true,
            completedAt: null,
            updatedAt: new Date().toISOString()
        })
        return reply.code(201).send(todo)
    } catch (err) {
        console.log(err)
        return reply.code(500).send({message: "Failed to update todo with provided data"})
    }
}

const completeTodo = async (req, reply) => {
    const {todoId} = req.query
    let _id = new ObjectId(todoId)
    const count = await Todo.count({_id, status: true, uid: req.user._id});
    if (count >= 0) {
        try {
            let todo = await Todo.findOneAndUpdate({_id: todoId, uid: req.user._id, status: true}, {
                status: true,
                completedAt: new Date().toISOString()
            })
            return reply.code(201).send(todo)
        } catch (err) {
            console.log(err)
            return reply.code(500).send({message: "Failed to update todo with provided data"})
        }
    } else {
        return reply.code(404).send({message: "Failed to update todo!! Todo is may be completed"})
    }
}


module.exports = {createTodoHandler, getAllTodosHandler,getTodos,updateTodo,completeTodo}
