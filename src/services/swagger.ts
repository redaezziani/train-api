import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Swagger Demo Project',
        description: 'Implementation of Swagger with TypeScript'
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
};

const outputFile = '../swagger_output.json';
const endpointsFiles = ['../routes/auth.ts', '../routes/car.ts', '../routes/line.ts', '../routes/seat.ts', '../routes/ticket.ts', '../routes/train.ts', '../routes/trip.ts', '../routes/user.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);