// @flow

function getEnv (key): string {
  return process.env['host.' + key] || ''
}

export default {
  hostCnode: getEnv('cnode.cms')
}
