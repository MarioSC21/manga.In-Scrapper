import { Response } from 'express'

export const handleErrorId = (res: Response, error: string | object, description?: String, objDes?: object) => {
  if (typeof error === 'string') {
    return res.status(400).send({
      status: false,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      message: description || 'Coloque una id valida',
      description: error,
      objDewscriptioon: objDes ?? {}
    }).end()
  }
  return res.status(400).send({
    status: false,
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    description: description || 'Coloque una id valida',
    urlError: (error as any).config?.url.split('/').slice(-2).join('/') as string ?? 'No se encontro la url',
    error: (error as any).message as string || error
  }).end()
}
