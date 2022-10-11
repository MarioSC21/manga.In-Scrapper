import { ReqResNext } from '../types'
import { getCapPageManga } from '../services/getCapManga.service'
import { handleErrorId } from '../middlewares/errorId.handle'

export const capPageManga: ReqResNext = async (req, res, next) => {
  try {
    const { idName, cap, pag } = req.params
    const getInfoCap = await getCapPageManga(idName, cap, pag)
    if (getInfoCap instanceof Error) {
      return handleErrorId(res, getInfoCap.message, 'las id no son validas')
    }
    return res.status(200).send({
      status: true,
      message: 'se ha obtenido la pagina del capitulo del manga',
      data: getInfoCap
    })
  } catch (error) {
    next(error)
  }
}
