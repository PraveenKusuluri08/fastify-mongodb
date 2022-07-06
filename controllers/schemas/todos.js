const createTodoOpts = {
    schema: {
        tags: ["Todo"],
        body: {
            type: "object",
            properties: {
                title: {type: "string"},
                description: {type: "string"},
            },
        },
        response: {
            201: {
                type: "object",
                properties: {
                    title: {type: "string"},
                    description: {type: "string"},
                    completedAt: {type: "string"},
                    status: {type: "boolean"},
                },
            },
            404: {
                type: "object",
                properties: {
                    message: {type: "string"},
                },
            },
        },
    },
}
/**
 * @object getAllTodos With status
 */
const getAllTodosOpts = {
    schema: {
        tags: ["Todo"],
        queryString: {
            type: "object",
            properties: {
                status: {type: "boolean"},
            },
            required: ["status"],
        },
        response: {
            200: {
                type: "object",
                properties: {
                    title: {type: "string"},
                    description: {type: "string"},
                    completedAt: {type: "string"},
                    status: {type: "boolean"},
                },
            },
            404: {
                type: "object",
                properties: {
                    message: {type: "string"},
                },
            },
        },
    },
}
/**
 * * @object getAll todos of the user
 */
const getAllTodosOfUserOpts = {
    schema: {
        tags: ["Todo"],
        response: {
            200: {
                type: 'object',
                properties: {
                    title: {type: "string"},
                    description: {type: "string"},
                    completedAt: {type: "string"},
                    status: {type: "boolean"},
                }
            },
            404: {
                type: "object",
                properties: {
                    message: {type: "string"},
                },
            }
        }
    }
}
const updateTodoOpts = {
    schema: {
        tags: ["Todo"],
        queryString: {
            type: "object",
            properties: {
                todoId: {
                    type: "string",
                }
            },
            required: ["todoId"]
        },
        body: {
            type: "object",
            properties: {
                title: {type: "string"},
                description: {type: "string"},
            },
            required: ["title", "description"]
        },
        responses: {
            201: {
                type: "object",
                properties: {
                    title: {type: "string"},
                    description: {type: "string"},
                    status: {type: "boolean"},
                    completedAt: {type: "string"},
                }
            },
            404: {
                type: "object",
                properties: {
                    message: {type: "string"}
                }
            }
        }
    }
}
const completeTodoOpts = {
    schema: {
        tags: ["Todo"],
        queryString: {
            type: "object",
            properties: {
                todoId: {
                    type: "string",
                }
            },
            required: ["todoId"]
        },
        body: {
            type: "object",
            properties: {
                title: {type: "string"},
                description: {type: "string"},
            },
            required: ["title", "description"]
        },
        responses: {
            201: {
                type: "object",
                properties: {
                    title: {type: "string"},
                    description: {type: "string"},
                    status: {type: "boolean"},
                    completedAt: {type: "string"},
                }
            },
            404: {
                type: "object",
                properties: {
                    message: {type: "string"}
                }
            }
        }
    }
}

const undoTodo={
    schema:{
        queryString:{
            type: "object",
            properties:{
                todoId:{type:'string'}
            }
        },
        response:{
            204:{
                type:"object",
                properties:{
                    message:{type:"string"}
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
const deleteTodo={
    schema:{
        queryString:{
            type: "object",
            properties:{
                id:{type:'string'}
            }
        },
        response:{
            200:{
                type:"object",
                properties:{
                    message:{type:"string"}
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
module.exports = {createTodoOpts, getAllTodosOpts, getAllTodosOfUserOpts, updateTodoOpts, completeTodoOpts,undoTodo,deleteTodo}
