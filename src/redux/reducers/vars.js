// @flow

import type { Vars } from '../type/vars'
import type { Action } from '../type'

export default function (state: Vars = {}, action: Action) {
  if (action.type === 'SET_VARS') {
    return { ...state, [action.key]: action.value }
  }

  return state
}
