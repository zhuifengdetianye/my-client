// @flow
import { delayPromise } from 'frame/core/promise'

export type FetchOpts = {
  method?: 'GET' | 'POST',
  headers?: { [string]: string },
  credentials?: 'same-origin' | 'include',
  body?: string | FormData,
  path?: string
}

export type Response = {
  url: string,
  text: () => Promise<string>,
  json: () => Promise<any>,
  headers: {
    get: string => string
  },
  status: number,
  statusText: string
};

function fetch (url: string, opts: FetchOpts): Promise<Response> {
  return Promise.race([
    window.fetch(url, opts),
    delayPromise(30*1000).then(() => {
      throw new Error('网络异常，请稍后处理')
    })
  ])
}

export default fetch
