import { getAxios, apiRutasNavigation, parseAtributes, parseText } from '../api/api'
import { ICapituloManga, Icapitulos, Ipages } from '../types'
import { domain } from '../utils/functionsgetinfoManga'

const { getCapituloManga } = apiRutasNavigation

export const getInfoCapManga = async (idName: string, cap: string): Promise<Error | ICapituloManga > => {
  try {
    const html = await getAxios(getCapituloManga(idName, cap))
    if (html instanceof Error) {
      return html
    }
    const htmlPrimerResultado = html.querySelectorAll('.nav')[1].querySelectorAll('li > a')[0]
    const linkMangaInfoId = htmlPrimerResultado.getAttribute('href')?.split('/').pop() as string
    const linkSearchMangaInfo = htmlPrimerResultado.textContent.trim()
    const capitulo = cap
    const capitulos: Icapitulos[] = html.querySelectorAll('#chapter-list > ul > li').map((item) => {
      const idCap = ((parseAtributes(item, 'a', 'href')) as string).split('/').pop() as string
      const nameCap = parseText(item, 'a') as string
      const linkCapitulo = `${domain}/manga/${linkMangaInfoId}/${idCap}`
      return {
        idCap,
        linkCapitulo,
        nameCap
      }
    })
    const allPages: Ipages[] = html.querySelectorAll('#all > img').map(i => {
      const nameCap = i.getAttribute('alt') as string
      const imageCap = i.getAttribute('data-src') as string
      const linkPageCapitulo = `${domain}/manga/${linkMangaInfoId}/${capitulo}/${+(nameCap.split(' ').at(-1) as string) || 1}`
      return {
        nameCap,
        linkPageCapitulo,
        imageCap
      }
    })
    return {
      linkMangaInfoId,
      linkSearchMangaInfo,
      capitulo,
      objCapitulos: {
        sizeCap: capitulos.length,
        capitulos
      },
      objPages: {
        sizePages: allPages.length,
        allPages
      }
    }
  } catch (error) {
    return error as Error
  }
}
