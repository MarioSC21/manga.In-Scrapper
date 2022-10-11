import { apiRutasNavigation, parseText, parseAtributes } from '../api/api'
import { HTMLElement } from 'node-html-parser'
import { domain } from './functionsgetinfoManga'

const { getQueryManga } = apiRutasNavigation

export function returnDirectorioMangasObj (html: HTMLElement) {
  // * paginacion
  const pagination = html.querySelectorAll('.col-xs-12 > .pagination > li').at(-2) as HTMLElement
  const paginationLinkQuerys: string[] = []
  if (pagination) {
    const numFinalPagination = +((parseAtributes(pagination, 'a', 'href') as string).split('=').pop() as string)
    for (let i = 1; i < numFinalPagination + 1; i++) {
      paginationLinkQuerys.push(`${domain}/${getQueryManga(i.toString())}`)
    }
  }

  // remove double quotes
  const pattern = /"/g
  const allManga = html.querySelectorAll('.col-sm-6').map(i => {
    const nameManga = (parseAtributes(i, '.media-heading > a', 'title') as string).replace(pattern, '')
    const idManga = (parseAtributes(i, 'a', 'href') as string).split('/').pop() as string
    const imageManga = parseAtributes(i, 'img', 'src') as string

    // * obteniendo vistas y genero mediante desestructuracion de array
    const [vistas, genero] = i.querySelectorAll('.media-body > div').map(i => i.textContent.trim()).splice(0, 2)

    const estado = parseText(i, '.media-body span') as string
    const puntuacion = parseText(i, 'span') as string
    return {
      nameManga,
      idManga: `${domain}/manga/${idManga}`,
      imageManga,
      genero,
      vistas,
      estado,
      puntuacion
    }
  })
  return {
    sizemanga: allManga.length,
    allManga,
    paginationLinkQuery: {
      sizePagination: paginationLinkQuerys.length,
      paginationLinkQuerys
    }
  }
}
