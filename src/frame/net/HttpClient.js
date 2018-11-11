// @flow

import type { FetchOpts } from './fetch'

import fetch from './fetch'
import querystring from 'qs'
import KnownError from 'frame/core/KnownError'

type Query = { [string]: string };
type Headers = { [string]: string };

function  getUrlWithQuery (url: string, query?: ?{[string]: string}) {
  const newQuery = Object.assign({}, query, { _t: +new Date() })
  return (
    url +
    (url.indexOf('?') === -1 ? '?' : '&') +
    querystring.stringify(newQuery)
  )
}

export default class Client {
  baseUrl: string;
  credentials: 'same-origin' | 'include';
  fetchOptsModifier: (opts: FetchOpts) => FetchOpts;

  constructor (
    baseUrl: string,
    fetchOptsModifier?: (opts: FetchOpts) => FetchOpts
  ) {
    this.baseUrl = baseUrl
    this.credentials = baseUrl.indexOf('/') === 0 ? 'same-origin' : 'include'
    this.fetchOptsModifier = fetchOptsModifier || (a => a)
  }

  fetchJson (url: string, opts: FetchOpts): Promise<*> {
    let perfOptions = { ...opts }
    return fetch(url, this.fetchOptsModifier(opts))
      .then(result => {
        //未授权
        if (result.status === 401) {
          throw new KnownError({ message: 'Unauthorized', code: 401 })
        }
        return result.json()
      })
      .catch((e: Error) => {
        if (e instanceof KnownError) {
          throw e
        }
        throw new KnownError({
          message: '网络异常',
          code: 0
        })
      })
  }

  get (path: string, query?: ?Query, headers?: Headers = {}): Promise<*> {
    const url = getUrlWithQuery(this.baseUrl + path, query)
    const opts = {
      headers,
      credentials: this.credentials,
      path: (query || {}).path
    }
    return this.fetchJson(url, opts)
  }

  postJson (path: string, body: mixed, headers?: Headers = {}): Promise<*> {
    const url = this.baseUrl + path
    headers['Content-Type'] = 'application/json'
    const opts = {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      credentials: this.credentials,
      path: body && body.path && typeof body.path === 'string' ? body.path : ''
    }
    return this.fetchJson(url, opts)
  }

  postForm (
    path: string,
    body: {[string]: string},
    headers?: Headers = {}
  ): Promise<*> {
    const url = this.baseUrl + path
    headers['Content-Type'] =
      'application/x-www-form-urlencoded; charset=utf-8'
    const opts = {
      method: 'POST',
      headers,
      body: querystring.stringify(body),
      credentials: this.credentials,
      path: (body || {}).path
    }
    return this.fetchJson(url, opts)
  }

  postFormData (
    path: string,
    formData: { [string]: any },
    headers: Headers = {}
  ): Promise<*> {
    const url = this.baseUrl + path
    let body = new window.FormData()
    for (let key in formData) {
      const value = formData[key]
      if (value != null) {
        if (value.blob) {
          body.append(key, value.blob, value.fileName)
        } else {
          body.append(key, value)
        }
      }
    }
    const opts = {
      method: 'POST',
      headers,
      body,
      credentials: this.credentials,
      path: (body.get && body.get('path')) || ''
    }
    return this.fetchJson(url, opts)
  }
}
