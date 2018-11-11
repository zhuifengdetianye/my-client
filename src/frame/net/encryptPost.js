// @flow

import { mClient } from 'frame/net/clientFactory'

// 还未遇到加密问题
export default function postEncrypted (body: any) {
  return mClient
    .get('/v2/common/getPublicKey')
    .then(publicKey => {
      console.log(publicKey)
    })
}
