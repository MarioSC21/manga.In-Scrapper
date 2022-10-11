import { HTMLElement } from 'node-html-parser'
import { IEncabezadoNameUrl } from '../types'
import config from '../config'

export const { domain } = config

// TODO funciones para obtener los tagsDescription => valorEncabezado
// * funcion para obtener el texto de la etiqueta
export function txtContent (e: string, i: number, contHtmlElement: HTMLElement[], valorEncabezado: any) {
  const txtCont = contHtmlElement[i].textContent?.trim()
  valorEncabezado[e] = txtCont
}

// * funcion para obtener el atributo "href" de la etiqueta "a"
export function objTags (e: string, i: number, contHtmlElement: HTMLElement[], valorEncabezado: any, query?: string) {
  const tags: IEncabezadoNameUrl[] = contHtmlElement[i].querySelectorAll('a').map((e) => {
    return {
      name: e.textContent,
      url: `${domain}/directorio/${query as string}/${(e.getAttribute('href') as string).split('/').pop() as string}`
    }
  })
  valorEncabezado[e] = tags
}
