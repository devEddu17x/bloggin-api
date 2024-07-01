export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bloggin API',
      version: '1.0.0'
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer'
        }
      },
      schemas: {
        auth: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            username: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' }
          }
        },
        user: {
          type: 'object',
          required: ['username', 'email', 'password', 'name', 'lastName'],
          properties: {
            username: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            name: { type: 'string' },
            lastName: { type: 'string' }
          }
        },
        useDetails: {
          type: 'object',
          required: [],
          properties: {
            country: { type: 'string' },
            phoneNumber: { type: 'string' },
            description: { type: 'string' },
            gender: { type: 'boolean' },
            birth: { type: 'string' }
          }
        },
        post: {
          type: 'object',
          required: ['title', 'content'],
          properties: {
            title: { type: 'string' },
            content: { type: 'string' }
          }
        }
      }
    }
  },
  apis: ['docs/api/routes/*.js']
}
