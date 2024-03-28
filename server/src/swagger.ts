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
                    scheme: 'bearer',
                }
            }
        }
    }


    const outputFile = './swagger_output.json'
    const endpointsFiles = ['./src/routes/*.ts']

    await swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc)
}
