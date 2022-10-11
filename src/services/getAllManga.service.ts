import { getAxios, apiRutasNavigation } from '../api/api'

import { returnDirectorioMangasObj } from '../utils/returnDirectorioMangas'

export enum ESortBy {
  views = 'views',
  name = 'name',
}

const { getInfoQueriUrls, getAllManga, getInfoQuery } = apiRutasNavigation

export const getAllMangas = async (
  page?: string,
  cat?: string,
  alpha?: string,
  sortBy?: ESortBy,
  asc?: string,
  author?: string,
  tag?: string,
  artist?: string
) => {
  if (page && cat) {
    const encodeURICat = encodeURI(cat)// para que pueda leer los espacios y caracteres especiales como chinos
    const html = await getAxios(getInfoQueriUrls(page, encodeURICat))
    if (html instanceof Error) {
      return html
    }
    return returnDirectorioMangasObj(html)
  } else if (
    page !== undefined &&
    cat !== undefined &&
    alpha !== undefined &&
    sortBy !== undefined &&
    asc !== undefined &&
    author !== undefined &&
    tag !== undefined &&
    artist !== undefined
  ) {
    const html = await getAxios(
      getAllManga(page, cat, alpha, sortBy, asc, author, tag, artist)
    )
    if (html instanceof Error) {
      return html
    }
    return returnDirectorioMangasObj(html)
  }

  // Todo en caso de que no se envien parametros se devolvera el directorio de mangas
  const html = await getAxios(getInfoQuery)
  if (html instanceof Error) {
    return html
  }
  return returnDirectorioMangasObj(html)
}
