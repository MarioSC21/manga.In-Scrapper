import { HTMLElement } from 'node-html-parser'
import { getAxios, parseAtributes, parseText } from '../api/api'
import { ILastestManga } from '../types'

export const getLastestManga = async (): Promise<ILastestManga[]> => {
  const html = await getAxios() as HTMLElement
  const lastest: ILastestManga[] = html.querySelectorAll('.hot-thumbnails > .span3').map(item => {
    const idName = (parseAtributes(item, '.manga-name > a', 'href') as string).split('/').pop() as string
    const SearchName = (parseText(item, '.manga-name > a') as string)
    const lastestCapManga = (parseAtributes(item, '.photo > .thumbnail', 'href') as string).split('/').pop() as string
    const imgLastestCapMaga = (parseAtributes(item, '.photo > .thumbnail > img', 'src') as string)
    const descriptionCap = (parseText(item, '.well > p') as string).trim()
    const puntuacion = (parseText(item, 'span > span') as string).trim()
    return {
      idName,
      SearchName,
      lastestCapManga,
      imgLastestCapMaga,
      descriptionCap,
      puntuacion
    }
  })
  return lastest
}
