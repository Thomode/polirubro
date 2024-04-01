import swaggerAutogen from 'swagger-autogen'

export async function runSwaggerAutogen() {
    const doc = {
        info: {
            version: 'v1.0.0',
            title: 'Polirubro API',
            description: 'Polirubro'
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
                    in: 'header',
                    name: 'Authorization',
                    description: 'Bearer token to access these api endpoints',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ]
    }


    const outputFile = './swagger_output.json'
    const endpointsFiles = ['./routes/index.ts']

    await swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc)
}

runSwaggerAutogen()
