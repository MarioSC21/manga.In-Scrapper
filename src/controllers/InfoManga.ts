import { ReqResNext } from '../types'
import { getInfoMangas } from '../services/getInfoManga.service'
import { handleErrorId } from '../middlewares/errorId.handle'

export const infoManga: ReqResNext = async (req, res, next) => {
  try {
    const { idName } = req.params
    const getInfoCap = await getInfoMangas(idName)
    if (getInfoCap instanceof Error) {
      return handleErrorId(res, getInfoCap.message, 'la id no es valida')
    }
    return res.status(200).send({
      status: true,
      message: 'Pagina de Informacion del manga obtenida',
      data: getInfoCap
    })
  } catch (error) {
    next(error)
  }
}
