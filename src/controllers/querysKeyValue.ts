import { ReqResNext } from '../types'
import { handleErrorId } from '../middlewares/errorId.handle'
import { getAllMangas } from '../services/getAllManga.service'

export const querysKeyValue: ReqResNext = async (req, res, next) => {
  try {
    const { querykey, queryvalue } = req.params
    const getQueryKeyQueryValues = await getAllMangas(querykey, queryvalue)
    if (getQueryKeyQueryValues instanceof Error) {
      return handleErrorId(res, getQueryKeyQueryValues.message, 'las id no son validas')
    }
    return res.status(200).send({
      status: true,
      message: 'pagina de consultas de querys',
      data: getQueryKeyQueryValues
    })
  } catch (error) {
    next(error)
  }
}
