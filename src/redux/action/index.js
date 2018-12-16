// @flow

export function setMap (
  keyPath: string | number | Array<string | number>,
  value: mixed
) {
  if (!Array.isArray(keyPath)) {
    keyPath = [keyPath]
  }
  return {
    type: 'SET_MAP',
    keyPath,
    value
  }
}

export function mergeMap (
  keyPath: string | number | Array<string | number>,
  value: mixed
) {
  if (!Array.isArray(keyPath)) {
    keyPath = [keyPath]
  }
  return {
    type: 'MERGE_MAP',
    keyPath,
    value
  }
}

export function updateMap (
  keyPath: string | number | Array<string | number>,
  notSetValue: any,
  updater: Function
) {
  if (!Array.isArray(keyPath)) {
    keyPath = [keyPath]
  }
  return {
    type: 'UPDATE_MAP',
    keyPath,
    notSetValue,
    updater
  }
}

export function deleteMap (...keyPath: Array<string | number>) {
  return {
    type: 'DELETE_MAP',
    keyPath
  }
}

export function setVars (key: string, value: mixed) {
  return {
    type: 'SET_VARS',
    key,
    value
  }
}
