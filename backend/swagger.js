const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        version: "1.0.0",
        title: "My API",
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
    },
    host: "localhost:3000",
    basePath: "/v1/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Posts",
            "description": "Endpoints"
        }
    ],
    definitions: {
        posts: {
            title: "title",
            description: "description"
        },
        comments: {
            description: "description"
        }
    }
}



const outputFile = './swagger_output.json'
const endpointsFiles = ['./routers.js' ]

swaggerAutogen(outputFile, endpointsFiles,doc)