import { ReqResNext } from '../types'
import { handleErrorId } from '../middlewares/errorId.handle'
import { getAllMangas } from '../services/getAllManga.service'

export const directorioMangas: ReqResNext = async (_, res, next) => {
  try {
    const directorio = await getAllMangas()
    if (directorio instanceof Error) {
      return handleErrorId(res, directorio.message, 'hubo un error al obtener el directorio de mangas')
    }
    return res.status(200).send({
      status: true,
      message: 'pagina de todos los mangas disponibles',
      data: directorio
    })
  } catch (error) {
    next(error)
  }
}
