import { ReqResNext } from '../types'
import { handleErrorId } from '../middlewares/errorId.handle'
import { getSearchMangas } from '../services/getSearchManga.service'

export const searchMangas: ReqResNext = async (req, res, next) => {
  try {
    const { q } = req.query
    if (q === undefined) {
      return res.status(400).send({
        status: false,
        message: 'la querys consultadas estan incompletas revisar => /buscar?q='
      })
    }
    const searchManga = await getSearchMangas(q as string)
    if (searchManga instanceof Error) {
      return handleErrorId(res, searchManga.message, 'problemas al buscar el manga')
    }
    return res.status(200).send({
      status: true,
      message: 'pagina de busqueda de mangas',
      data: searchManga
    })
  } catch (error) {
    next(error)
  }
}
