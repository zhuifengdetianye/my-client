// @flow

import type { Item } from '../type'

import { getState } from 'redux/store'

export function getItemList (): Array<Item> {
  return getState().map.getIn(['easyList', 'search'], [])
}
