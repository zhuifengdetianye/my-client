// @flow

import type { UiPopup } from '../type/uiPopup'
import type { Action } from '../type'

const initState = { popupType: null }

export default function (state: UiPopup = initState, action: Action) {
  if (action.type === 'UI_POPUP') {
    return action
  }
  if (action.type === 'UI_POPUP_CLOSE') {
    return initState
  }
  return state
}
