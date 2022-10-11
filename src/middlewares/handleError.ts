import { Request, Response, NextFunction } from 'express'
import boom from '@hapi/boom'

export default (error: string, req: Request, res: Response, next: NextFunction, nameErr = 'Coloque una id valida') => {
  console.log(error)
  if (error !== '') {
    res.status(400).send({
      status: false,
      Error: boom.notFound(nameErr)
    })
  } else {
    res.status(500).end()
  }
}
