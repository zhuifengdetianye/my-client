// @flow

import HttpClient from 'frame/net/HttpClient'

function getEnvValue (key): string {
  return process.env[key] || ''
}

const mClient = new HttpClient(getEnvValue('host.mApi'))
console.info(process.env)
export { mClient }
