import { getAxios, apiRutasNavigation } from '../api/api'
import { IvalorEncabezado, IJSONCapitulo, IInfoManga } from '../types'
import { txtContent, objTags, domain } from '../utils/functionsgetinfoManga'

const { getInfoManga } = apiRutasNavigation

// ? cambiar valores o agregar si es que cambian o agregan mas categorias
const categorias = {
  autor: 'author',
  artista: 'artist',
  categoria: 'category'
}

// TODO main function export controller
export const getInfoMangas = async (idName: string): Promise<IInfoManga | Error> => {
  try {
    const html = await getAxios(getInfoManga(idName))
    if (html instanceof Error) {
      return html
    }
    const nameManga = html.querySelector('.col-sm-12 > #title')?.textContent as string
    const tagManga = html.querySelector('.manga-name > a')?.getAttribute('href')?.split('/').at(-1) as string
    const imageManga = html.querySelector('.img-responsive')?.getAttribute('src') as string
    const rating = html.querySelectorAll('span')[8]?.textContent

    // * tags para el manga
    const encabezado = html.querySelectorAll('.dl-horizontal > dt').map((e) => e.textContent)
    const newEncabezado = encabezado.splice(0, encabezado.length - 2) // ? elimina los ultimos 2 elementos

    const contenidoHtmlE = html.querySelectorAll('.dl-horizontal > dd') // ? contenido de los encabezados

    //* remove "\r\n"
    const pattern = /\r\n/g
    const descriptionManga = html.querySelectorAll('.well > p').map((e) => e.textContent.trim().replace(pattern, '')).join('')

    const valorEncabezado: IvalorEncabezado = {}

    // * recorre el array de encabezados y contenido (aca se puede colocar mas tipos de etiquetas si la pagina cambia)
    const { autor, artista, categoria } = categorias // destructuracion de objeto

    newEncabezado.forEach((e, i) => {
      if (e === 'Tipo') {
        txtContent(e, i, contenidoHtmlE, valorEncabezado)
      }
      if (e === 'Nombres') {
        txtContent(e, i, contenidoHtmlE, valorEncabezado)
      }
      if (e === 'Autor') {
        objTags(e, i, contenidoHtmlE, valorEncabezado, autor)
      }
      if (e === 'Artista') {
        objTags(e, i, contenidoHtmlE, valorEncabezado, artista)
      }
      if (e === 'Fecha de Publicación') {
        txtContent(e, i, contenidoHtmlE, valorEncabezado)
      }
      if (e === 'Demográfico') {
        objTags(e, i, contenidoHtmlE, valorEncabezado, categoria)
      }
      if (e === 'Género') {
        objTags(e, i, contenidoHtmlE, valorEncabezado, categoria)
      }
    })

    // * obteniendo los capitulos del script encargado de la paginacion => se esta conviertiendo un string a un array de objetos
    const scriptJs = html.querySelectorAll('script')[28].toString()
    const arrayCapitulosScript = scriptJs.split('var')[3].trim().split('=')[1].trim()
    const CapitulosScriptSinComa = arrayCapitulosScript.substring(0, arrayCapitulosScript.length - 1)
    const jsonCapitulos: IJSONCapitulo[] = JSON.parse(CapitulosScriptSinComa)
    const capitulos = jsonCapitulos.map((e) => {
      return {
        id: e.id,
        slug: e.slug,
        name: e.name,
        number: e.number,
        volume: e.volume,
        linkCap: `${domain}/manga/${idName}/${e.slug}`
      }
    })
    return {
      nameManga,
      tagManga,
      imageManga,
      descriptionManga,
      rating,
      tagsDescription: {
        tagsEncabezado: newEncabezado, // array the header tags
        valorEncabezado //  Object[Key]:value the header tags
      },
      capitulos: {
        sizeCapitulos: jsonCapitulos.length,
        capitulos // arary of capitulos
      }
    }
  } catch (error) {
    return error as Error
  }
}
