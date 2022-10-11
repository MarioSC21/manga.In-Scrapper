import { Response, Request, NextFunction } from 'express'
import { HTMLElement as HTMLElementParser } from 'node-html-parser'

// ? request, response, next type
export type ReqRes = (req: Request, res: Response) => Promise<any>
export type ReqResNext = (req: Request, res: Response, next: NextFunction) => Promise<any>

// ? api routes
export interface API_RUTAS {
  getLastestManga: string
  getQueryManga: (page?: string, cat?: string, alpha?: string, sortBy?: string, asc?: string, author?: string, tag?: string, artist?: string) => string
  getAllManga: (page?: string, cat?: string, alpha?: string, sortBy?: string, asc?: string, author?: string, tag?: string, artist?: string) => string
  getInfoQuery: string
  getInfoQueriUrls: (keyQuery: string, valueQuery: string) => string
  getInfoManga: (idname: string) => string
  getCapituloManga: (idname: string, cap: string) => string
  getCapituloMangaPage: (idname: string, cap: string, page: string) => string
  getSearchManga: (search: string) => string
}

// ? queryUrl
export type IqueryUrl = (page?: string, cat?: string, alpha?: string, sortBy?: string, asc?: string, author?: string, tag?: string, artist?: string) => string

// ? interface para poder parsear los datos
export type Iparse = (html: HTMLElementParser,
  etiqueta: string,
  atr?: string) => string | HTMLElementParser[]

// ? interface de getLastestManga
export interface ILastestManga {
  idName: string
  SearchName: string
  lastestCapManga: string
  imgLastestCapMaga: string
  descriptionCap: string
  puntuacion: string
}

// ? interface de getUpdateLastestManga
export interface IUpdateLastestManga {
  idName: string
  searchIdName: string
  genero: string
  fechaPublicacion: string
  imageManga: string
  capitulosPublicados: Array<{
    IdLastestCap: string
    nameLastestCap: string
  }>
}

// ? interface de getCapituloManga
export interface ICapituloManga {
  linkMangaInfoId: string
  linkSearchMangaInfo: string
  capitulo: string
  objCapitulos: {
    sizeCap: number
    capitulos: Icapitulos[]
  }
  objPages: {
    sizePages: number
    allPages: Ipages[]
  }
}

export interface Icapitulos {
  idCap: string
  linkCapitulo: string
  nameCap: string
}

export interface Ipages {
  nameCap: string
  linkPageCapitulo: string
  imageCap: string
}

// ? interface de getCapituloMangaPage
export interface ICapituloMangaPage {
  linkMangaInfoId: string
  linkSearchMangaInfo: string
  capitulo: string
  numeroCapitulos: number
  paginacion: {
    prevStatus: boolean
    prevCap: string
    nextStatus: boolean
    nextCap: string
  }
  nameCap: string
  imagenCap: string
}

// ? inmterface valorEncabezado
export interface IvalorEncabezado {
  Tipo?: string
  Nombres?: string
  Autor?: IEncabezadoNameUrl[]
  Artista?: IEncabezadoNameUrl[]
  'Fecha de Publicación'?: string
  Demográfico?: IEncabezadoNameUrl[]
  Género?: IEncabezadoNameUrl[]
}

export interface IEncabezadoNameUrl {
  name: string
  url: string
}

// export interface IEncabezado extends Omit<IvalorEncabezado, 'Autor' | 'Artista' | 'Demográfico' | 'Género'>{
//   Autor?: string
//   Artista?: string
//   Demográfico?: string
//   Género?: string
// }

// ? interface del JSONCapitulo
export interface IJSONCapitulo {
  id: string
  slug: string
  name: string
  number: string
  volume: string
  manga_id?: string
  user_id?: string
  created_at?: string
  updated_at?: string
  user?: {
    id: string
    name: string
    username: string
    email: string
    password: string
    confirmation_code: string
    status: string
    remember_token: string
    confirmed: string
    notify: string
    avatar: string
    created_at: string
    updated_at: string
  }
}

// ? interface del getInfoMangas
export interface IInfoManga {
  nameManga: string
  tagManga: string
  imageManga: string
  descriptionManga: string
  rating: string
  tagsDescription: {
    tagsEncabezado: string[]
    valorEncabezado: IvalorEncabezado
  }
  capitulos: {
    sizeCapitulos: number
    capitulos: IJSONCapitulo[]
  }
}

// ? interface de getSearchManga
export interface ISearchManga {
  value: string
  label: string
  data: string
  cate: string
  tags: string
  mangALL: IInfoManga
}

export interface IMangaAll {
  id: string
  name: string
  slug: string
  otherNames: string
  author: string
  artist: string
  status_id: string
}
