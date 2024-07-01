import swaggerJSDoc from 'swagger-jsdoc'
import { writeFileSync } from 'node:fs'
import { swaggerOptions } from './swaggerConfig.js'

const swaggerSpect = swaggerJSDoc(swaggerOptions)
const path = './docs/swagger.json'
writeFileSync(path, JSON.stringify(swaggerSpect, null, 2), 'utf-8')
console.log('Swagger docs generated at', path)
