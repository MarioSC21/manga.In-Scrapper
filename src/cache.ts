
import expeditius, { ExpeditiousOptions } from 'express-expeditious'

const cacheOptions: ExpeditiousOptions = {
  namespace: 'mangaIn',
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  engine: require('expeditious-engine-memory')(),
  statusCodeExpires: {
    404: (30 * 1000),
    500: (60 * 1000)
  },
  defaultTtl: '2 minute'
}
export const cache = expeditius(cacheOptions)
