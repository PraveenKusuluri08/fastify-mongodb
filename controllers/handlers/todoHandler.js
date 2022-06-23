const Todo = require("../../models/todo")

const createTodoHandler =async(req,reply)=>{
    const {title,description} = req.body
    try{

    let count=await Todo.count({title})
    if(count>0) {
       let todoData=await Todo.findOne({title})
        return reply.code(404).send({message:"Todo already exists",todoData})
    }

    let createTodo=await Todo.create({
        title,
        description,
        uid:req.user._id
    })
    reply.code(201).send(createTodo)
    }catch(err){
        reply.code(404).send({message:"Failed to create todos"})
    }
}

module.exports={createTodoHandler}