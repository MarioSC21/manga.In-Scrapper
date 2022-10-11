import { ReqRes } from '../types'
import { getLastestManga } from '../services/lastestManga.service'

export const lastestManga: ReqRes = async (_, res) => {
  try {
    const lastest = await getLastestManga()
    res.status(200).send({
      status: true,
      message: 'Lastest Manga',
      data: lastest
    })
  } catch (error) {
    res.status(500).send({
      status: false,
      error
    })
  }
}
