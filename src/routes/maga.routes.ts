import { Router } from 'express'
import { lastestManga } from '../controllers/lastestManga'
import { updatelastestManga } from '../controllers/lastestUpdateManga'
import { InfoCapManga } from '../controllers/InfoCapManga'
import { capPageManga } from '../controllers/capPageManga'
import { infoManga } from '../controllers/InfoManga'
import { allManga } from '../controllers/allManga'
import { directorioMangas } from '../controllers/directorioManga'
import { querysKeyValue } from '../controllers/querysKeyValue'
import { searchMangas } from '../controllers/SearchManga'

const router = Router()

router.get('/lastest', lastestManga)
router.get('/lastest/update', updatelastestManga)
router.get('/manga/:idName', infoManga)
router.get('/manga/:idName/:cap', InfoCapManga)
router.get('/manga/:idName/:cap/:pag', capPageManga)
router.get('/mangaList', directorioMangas)
router.get('/directorio/:querykey/:queryvalue', querysKeyValue)
router.get('/directorio', allManga)
router.get('/search', searchMangas)

export default router
