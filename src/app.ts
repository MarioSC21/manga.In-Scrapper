import express from 'express'
import cors from 'cors'
import { cache } from './cache'
import config from './config'
import mangaRoute from './routes/maga.routes'
import notFound from './middlewares/notFound'
import handleError from './middlewares/handleError'
import { ReqRes } from './types'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const app = express()

// ? Middleware
app.use(cors())
app.use(cache)
app.use(express.json())

// ? Puerto
app.set('port', config.port)

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'REST API for Swagger Documentation',
      description: 'Api for web scraping and manga.in page',
      version: '1.0.0',
      contact: {
        name: 'MarioSC21',
        url: 'https://mariosc21.github.io/myPortfolio/'
      }
    },
    schemes: ['http', 'https'],
    servers: [{ url: 'http://localhost:3000/' }],
    externalDocs: {
      description: 'Link to repository',
      url: 'https://github.com/MarioSC21/manga.In-Scrapper'
    }

  },
  apis: [
    './src/routes/maga.routes.ts'
  ]
}

const specs = swaggerJSDoc(options)

// ? Ruta principal
app.get<ReqRes>('/', (_, res) => {
  res.status(200).json({
    status: true,
    message: 'Web scraping and manga.in page api',
    repository: 'https://github.com/MarioSC21/manga.In-Scrapper',
    endPoints: {
      latest: '/lastest',
      lastestUpdate: '/lastest/update',
      infoManga: '/manga/:idName',
      infoCapituloManga: '/manga/:idName/:cap',
      paginacionCapitulo: '/manga/:idName/:cap/:pag',
      directorioMangas: '/mangaList',
      directorioQueryFilters: '/directorio?page=&cat=&alpha=&sortBy=views&asc=true&author=&tag=&artist=',
      directorioCategoriaValor: '/directorio/:querykey/:queryvalue',
      searchManga: '/search?q=name'
    }
  })
})

// ? Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

// ? Rutas
app.use(mangaRoute)

// ? middlewares
app.use(handleError)
app.use(notFound)

export default app
