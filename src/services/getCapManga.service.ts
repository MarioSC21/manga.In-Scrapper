import { getAxios, apiRutasNavigation } from '../api/api'
import { ICapituloMangaPage } from '../types'
import { domain } from '../utils/functionsgetinfoManga'

const { getCapituloMangaPage } = apiRutasNavigation

export const getCapPageManga = async (idName: string, cap: string, pag: string): Promise<Error | ICapituloMangaPage> => {
  try {
    const html = await getAxios(getCapituloMangaPage(idName, cap, pag))
    if (html instanceof Error) {
      return html
    }
    const htmlPrimerResultado = html.querySelectorAll('.nav')[1].querySelectorAll('li > a')[0]
    const linkMangaInfoId = htmlPrimerResultado.getAttribute('href')?.split('/').pop() as string
    const linkSearchMangaInfo = htmlPrimerResultado.textContent.trim()
    const capPage = html.querySelectorAll('#all > img')[+pag - 1]
    const numeroCapitulos = html.querySelectorAll('#all > img').length
    const capitulo = (capPage.getAttribute('data-src') as string).split('/').at(-2) as string
    const prevStatus = +pag - 1 !== 0
    const prevCap = `${domain}/manga/${linkMangaInfoId}/${capitulo}/${+pag - 1 === 0 ? 1 : +pag - 1}`
    const nextStatus = +pag + 1 !== numeroCapitulos + 1
    const nextCap = `${domain}/manga/${linkMangaInfoId}/${capitulo}/${+pag + 1 === numeroCapitulos + 1 ? numeroCapitulos : +pag + 1}`
    const nameCap = capPage.getAttribute('alt') as string
    const imagenCap = capPage.getAttribute('data-src') as string
    return {
      linkMangaInfoId,
      linkSearchMangaInfo,
      capitulo,
      numeroCapitulos,
      paginacion: {
        prevStatus,
        prevCap,
        nextStatus,
        nextCap
      },
      nameCap,
      imagenCap
    }
  } catch (error) {
    return error as Error
  }
}
