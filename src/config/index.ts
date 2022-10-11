import { config } from 'dotenv'
config()

export default {
  port: process.env.PORT ?? 3000,
  domain: process.env.DOMAIN ?? 'http://localhost:3000' // sin el slash final
}
