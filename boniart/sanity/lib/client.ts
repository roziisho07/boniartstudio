import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, readToken } from '../env'

const isDev = process.env.NODE_ENV !== 'production'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: readToken,
  useCdn: readToken ? false : true,
  perspective: readToken && isDev ? 'drafts' : 'published',
})
