

const createTodoOpts={
    schema:{
        tags:["Todo"],
        body: {
            type: "object",
            properties: {
                title: { type: "string" },
                description: { type: "string" },
            },
        },
        response:{
            201:{
               type:"object",
               properties:{
                   title:{type:"string"},
                   description:{type:"string"},
                   completedAt: {type:"string"},
                   status:{type:"boolean"}
               }
            },
            404:{
                type:"object",
                properties:{
                    message:{type:"string"}
                }
            }
        }
    }
}

module.exports=createTodoOpts