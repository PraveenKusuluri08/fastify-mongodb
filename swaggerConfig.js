let SwaggerOpts = {
    info: {
        title: "Node and fastify",
        description: "Nodejs and fastify auth and todo",
        version: "1.0.0"
    },
    host: "http://localhost:5000/",
    schemas: ["http", "https"],
    tags: [{name: "User", description: "All user endpoints exist here"},
        {name: "Todo", description: "TODO application endpoints"}
    ]
}
module.exports = SwaggerOpts