import { ReqRes } from '../types'
import { getUpdateLastestManga } from '../services/lastestupdateManga.service'

export const updatelastestManga: ReqRes = async (_, res) => {
  try {
    const updatelastest = await getUpdateLastestManga()
    res.status(200).send({
      status: true,
      message: 'Update Lastest Manga',
      data: updatelastest
    })
  } catch (error) {
    res.status(500).send({
      status: false,
      error
    })
  }
}
