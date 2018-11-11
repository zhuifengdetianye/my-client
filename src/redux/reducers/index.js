// @flow

import { combineReducers } from 'redux'
import vars from './vars'
import map from './map'
import uiPopup from './uiPopup'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxFormReducer } from 'redux-form'

export default combineReducers({
  vars,
  map,
  uiPopup,
  router: routerReducer,
  form: reduxFormReducer
})
