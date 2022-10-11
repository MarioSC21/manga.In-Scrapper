import { ReqResNext } from '../types'
import { getInfoCapManga } from '../services/getInfoCapMaga.service'
import { handleErrorId } from '../middlewares/errorId.handle'

export const InfoCapManga: ReqResNext = async (req, res, next) => {
  try {
    const { idName, cap } = req.params
    const getInfoCap = await getInfoCapManga(idName, cap)
    if (getInfoCap instanceof Error) {
      return handleErrorId(res, getInfoCap.message, 'las id no son validas')
    }
    return res.status(200).send({
      status: true,
      message: 'Info del capitulo del manga',
      data: getInfoCap
    })
  } catch (error) {
    next(error)
  }
}
