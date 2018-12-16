// @flow

import HttpClient from 'frame/net/HttpClient'
import config from './config'

const cmsClient = new HttpClient(config.hostCnode)

export function get (path: string, query?: { [string]: string }): Promise<*> {
  return cmsClient.get(path, query).catch(e => {
    throw e
  })
}

export function postJson (path: string, body: mixed): Promise<*> {
  return cmsClient.postJson(path, body).catch(e => {
    throw e
  })
}

export function postFormData (path: string, formData: { [string]: any}): Promise<*> {
  return cmsClient.postFormData(path, formData).catch(e => {
    throw e
  })
}
