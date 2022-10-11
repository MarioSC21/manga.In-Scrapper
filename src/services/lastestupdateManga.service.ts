import {
  getAxios,
  parseAtributes,
  apiRutasNavigation,
  parseText
} from '../api/api'
import parse from 'node-html-parser/dist/parse'
import { IUpdateLastestManga } from '../types'
import { HTMLElement } from 'node-html-parser'

const { getLastestManga } = apiRutasNavigation

export const getUpdateLastestManga = async (): Promise<IUpdateLastestManga[]> => {
  const html = await getAxios() as HTMLElement
  const lastest: IUpdateLastestManga[] = html
    .querySelectorAll('.mangalist > .manga-item')
    .map((item) => {
      const idName = (item.querySelectorAll('.manga-heading > a')[1].getAttribute('href') as string).split('/').pop() as string
      const searchIdName = item.querySelectorAll('.manga-heading > a')[1].textContent
      const genero = (parseText(item, '.manga-heading > span') as string)
      const fechaPublicacion = (parseText(item, 'small') as string).trim()
      const imageManga = parse(
        parseAtributes(
          item,
          '.manga-heading > .fa-info-circle',
          'title'
        ) as string
      )
        .querySelectorAll('.thumbnail')
        .map((i) => parseAtributes(i, 'img', 'src'))
        .join('')
      const capitulosPublicados = item.querySelectorAll('.manga-chapter').map(i => {
        const IdLastestCap = (parseAtributes(i, 'a', 'href') as string).split('/').pop() as string
        const nameLastestCap = parseText(i, 'a') as string
        return {
          IdLastestCap,
          nameLastestCap
        }
      })
      return {
        idName,
        searchIdName,
        genero,
        fechaPublicacion,
        imageManga: `${getLastestManga}${imageManga}`,
        capitulosPublicados
      }
    })
  return lastest
}
