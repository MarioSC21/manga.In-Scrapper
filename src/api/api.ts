import parse, { HTMLElement } from 'node-html-parser'

import axios from 'axios'
import { API_RUTAS, Iparse } from '../types'

const URL_MANGA: string = 'https://mangas.in'
export const URL_MANGA_QUERY: string =
  'filterList?page=&cat=&alpha=&sortBy=views&asc=true&author=&tag=&artist='

export const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
}

export const apiRutasNavigation: API_RUTAS = {
  getLastestManga: `${URL_MANGA}`,
  getQueryManga: (page, cat, alpha, sortBy, asc, author, tag, artist) => {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return `directorio?page=${page || ''}&cat=${cat || ''}&alpha=${alpha || ''}&sortBy=${sortBy || 'views'}&asc=${asc || 'true'}&author=${author || ''}&tag=${tag || ''}&artist=${artist || ''}`
  },
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  getAllManga: (page, cat, alpha, sortBy, asc, author, tag, artist) => `${URL_MANGA}/filterList?page=${page || ''}&cat=${cat || ''}&alpha=${alpha || ''}&sortBy=${sortBy || 'views'}&asc=${asc || 'true'}&author=${author || ''}&tag=${tag || ''}&artist=${artist || ''}`,
  getInfoQuery: `${URL_MANGA}/manga-list`,
  getInfoQueriUrls: (keyQuery, valueQuery) => `${URL_MANGA}/manga-list/${keyQuery}/${valueQuery}`,
  getInfoManga: (idname) => `${URL_MANGA}/manga/${idname}`,
  getCapituloManga: (idname, cap) => `${URL_MANGA}/manga/${idname}/${cap}`,
  getCapituloMangaPage: (idname, cap, page) =>
    `${URL_MANGA}/manga/${idname}/${cap}/${page}`,
  getSearchManga: (search) => `${URL_MANGA}/search?q=${search}`
}

export const getAxios = async (
  url: string = URL_MANGA
): Promise<HTMLElement | Error> => {
  try {
    const response = await axios.get(url, { headers })
    return parse(response.data)
  } catch (error) {
    return error as Error
  }
}

export const parseAtributes: Iparse = (html, etiqueta, atr) => {
  return html.querySelector(etiqueta)?.getAttribute(atr as string) as string
}

export const parseText: Iparse = (html, etiqueta) => {
  const text = html.querySelector(etiqueta)?.textContent as string
  return text
}

export { parse }
