// @flow

import type { MapType } from '../type/map'
import type { Action } from '../type'

import { Map } from 'immutable'

export default function (state: MapType = Map({}), action: Action) {
  if (action.type === 'SET_MAP') {
    if (typeof action.value === 'function') {
      return state.updateIn(action.keyPath, action.value)
    } else {
      return state.setIn(action.keyPath, action.value)
    }
  }

  if (action.type === 'MERGE_MAP') {
    return state.mergeIn(action.keyPath, action.value)
  }

  if (action.type === 'UPDATE_MAP') {
    return state.updateIn(action.keyPath, action.notSetValue, action.updater)
  }

  if (action.type === 'DELETE_MAP') {
    return state.deleteIn(action.keyPath)
  }

  return state
}
