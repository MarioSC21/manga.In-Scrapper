import express from 'express'
import cors from 'cors'
import { cache } from './cache'
import config from './config'
import mangaRoute from './routes/maga.routes'
import notFound from './middlewares/notFound'
import handleError from './middlewares/handleError'
import { ReqRes } from './types'

const app = express()

// ? Middleware
app.use(cors())
app.use(cache)
app.use(express.json())

// ? Puerto
app.set('port', config.port)

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

// ? Rutas
app.use(mangaRoute)

// ? middlewares
app.use(handleError)
app.use(notFound)

export default app
