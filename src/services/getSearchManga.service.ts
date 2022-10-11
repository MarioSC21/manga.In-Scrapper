import axios from 'axios'
import parse from 'node-html-parser/dist/parse'
import { domain } from '../utils/functionsgetinfoManga'
import { apiRutasNavigation, headers, parseAtributes } from '../api/api'
import { ISearchManga } from '../types'

const { getSearchManga } = apiRutasNavigation

export const getSearchMangas = async (search: string) => {
  if (search.length < 2) {
    return new Error('minimo 2 caracteres')
  }

  // Todo la pgaina devuelve la busqueda en foramto JSON es nesesario los headers
  const { data } = await axios.get<ISearchManga[]>(getSearchManga(search), { headers })
  const linksImages = data.map((item) => {
    const labelJson = item.label
    const htmllabel = parse(labelJson)
    const imageLink = parseAtributes(htmllabel, 'img', 'src') as string
    const mangaLink = (parseAtributes(htmllabel, '.media-left > a', 'href') as string).split('/').pop() as string
    return {
      ...item,
      imageLink,
      mangaLink: `${domain}/manga/${mangaLink}`
    }
  })
  return {
    size: data.length,
    linksImages
  }
}
