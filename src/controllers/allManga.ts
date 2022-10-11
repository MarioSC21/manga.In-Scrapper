import { ReqResNext } from '../types'
import { getAllMangas, ESortBy } from '../services/getAllManga.service'
import { handleErrorId } from '../middlewares/errorId.handle'

const InfoQuerys = {
  page: '[string] -> colocar pagina del numero a consultar desde el 1 hasta el numero de paginas existentes',
  cat: '[string] -> colocar categoria del manga a consultar, puede ser en en numeos del 1 al 34 o sus nombres correspondientes',
  alpha: '[string] -> filtrar por letra del nombre del manga a consultar, va desde la A hasta la Z en mayusculas o other(#)',
  sortBy: '[string] -> ordenar por el parametro que se desee, puede ser views o name -> solo tiene dos opciones',
  asc: '[string] -> ordenar de forma ascendente o descendente, puede ser true o false -> solo tiene dos opciones'
}

export const allManga: ReqResNext = async (req, res, next) => {
  try {
    const { page, cat, alpha, sortBy, asc, author, tag, artist } = req.query
    if (
      page === undefined ||
      +page <= 0 ||
      cat === undefined ||
      alpha === undefined ||
      sortBy === undefined ||
      asc === undefined ||
      author === undefined ||
      tag === undefined ||
      artist === undefined
    ) {
      return handleErrorId(
        res,
        'las querys consultadas estan incompletas revisar => /directorio?page=&cat=&alpha=&sortBy=views&asc=true&author=&tag=&artist=',
        'faltan parametros => parametros de las querys : {page, cat, alpha, sortBy, asc, author, tag, artist} o revisar los valores de las querys que seam los correctos',
        InfoQuerys
      )
    }

    const getAllManga = await getAllMangas(
      page as string,
      cat as string,
      alpha as string,
      sortBy as ESortBy,
      asc as string,
      author as string,
      tag as string,
      artist as string
    )
    if (getAllManga instanceof Error) {
      return handleErrorId(res, getAllManga.message, 'la id no es valida')
    }
    return res.status(200).send({
      status: true,
      message: 'Pagina de de todos los mangas',
      InfoQuerys: InfoQuerys,
      data: getAllManga
    })
  } catch (error) {
    next(error)
  }
}
