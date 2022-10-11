import express, { Request, Response } from 'express'
import cors from 'cors'
import { cache } from './cache'
import config from './config'
import mangaRoute from './routes/maga.routes'
import notFound from './middlewares/notFound'
import handleError from './middlewares/handleError'

const app = express()

// ? Middleware
app.use(cors())
app.use(cache)
app.use(express.json())

// ? Puerto
app.set('port', config.port)

// ? Ruta principal
app.get('/', (_: Request, res: Response) => {
  res.status(200).json({
    status: true,
    message: 'Sraper de mangas.in y novelas',
    repository: 'https://github.com/MarioSC21/AnimeFenix-Api-Scraping',
    endPoints: {
      latest: '/lastest',
      lastestUpdate: '/lastest/update',
      infoCapitulo: '/manga/:idName/:cap',
      paginacionCapitulo: '/manga/:idName/:cap/:pag',
      download: '/download/:id',
      search: '/search?q=name'
    },
    endPointsPost: {
      info: 'colocar el nombre de usuario y password de la pagina de animefenix si desea descargar con su usuario',
      download: '/download/:id'
    }
  })
})

// ? Rutas
app.use(mangaRoute)

// ? middlewares
app.use(handleError)
app.use(notFound)

export default app
