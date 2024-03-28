import swaggerAutogen from 'swagger-autogen'

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Polirubro API',
        description: 'polirubro'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: ''
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        }
    }
}


const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes/index.ts']

swaggerAutogen()(outputFile, endpointsFiles, doc)
