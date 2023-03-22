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
/**
 * @swagger
 * /lastest:
 *   get:
 *     summary: Retorna el último manga agregado
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/lastest', lastestManga)

/**
 * @swagger
 * /lastest/update:
 *   get:
 *     summary: Retorna el último manga agregado y actaliza la lista de mangas
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/lastest/update', updatelastestManga)
/**
 * @swagger
 * /manga/{idName}:
 *   get:
 *     summary: Obtener información de un manga.
 *     description: Obtiene información detallada de un manga dado su nombre.
 *     parameters:
 *       - in: path
 *         name: idName
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del manga.
 *     responses:
 *       '200':
 *         description: Información detallada del manga.
 */
router.get('/manga/:idName', infoManga)

/**
 * @swagger
* /manga/{idName}/{cap}:
 *   get:
 *     summary: Obtener información de un capítulo de un manga.
 *     description: Obtiene información detallada de un capítulo de un manga dado su nombre y número de capítulo.
 *     parameters:
 *       - in: path
 *         name: idName
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del manga.
 *       - in: path
 *         name: cap
 *         schema:
 *           type: string
 *         required: true
 *         description: Número del capítulo.
 *     responses:
 *       '200':
 *         description: Información detallada del capítulo.
 */
router.get('/manga/:idName/:cap', InfoCapManga)

/**
 * @swagger
 * /manga/{idName}/{cap}/{pag}:
 *   get:
 *     summary: Obtener información de una página de un capítulo de un manga.
 *     description: Obtiene información detallada de una página de un capítulo de un manga dado su nombre, número de capítulo y número de página.
 *     parameters:
 *       - in: path
 *         name: idName
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del manga.
 *       - in: path
 *         name: cap
 *         schema:
 *           type: string
 *         required: true
 *         description: Número del capítulo.
 *       - in: path
 *         name: pag
 *         schema:
 *           type: string
 *         required: true
 *         description: Número de la página.
 *     responses:
 *       '200':
 *         description: Información
 */
router.get('/manga/:idName/:cap/:pag', capPageManga)
/**
 * @swagger
 * /lastest/mangaList:
 *   get:
 *     summary: Lista todo el directorio de los mangas
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/mangaList', directorioMangas)

/**
 * @swagger
 * /directorio/{querykey}/{queryvalue}:
 *   get:
 *     summary: Obtener mangas por valor de query key y query value.
 *     parameters:
 *       - in: path
 *         name: querykey
 *         required: true
 *         description: Nombre del query key.
 *         schema:
 *           type: string
 *       - in: path
 *         name: queryvalue
 *         required: true
 *         description: Valor del query key.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de mangas con el valor de query key y query value especificados.
 *       400:
 *         description: Error en la petición.
 *       500:
 *         description: Error en el servidor.
 */
router.get('/directorio/:querykey/:queryvalue', querysKeyValue)

/**
 * @swagger
 * /lastest/directorio:
 *   get:
 *     summary: Lista todos los mangas
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/directorio', allManga)

/**
 * @swagger
 * /lastest/search:
 *   get:
 *     summary: para buscar mangas
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/search', searchMangas)

export default router
