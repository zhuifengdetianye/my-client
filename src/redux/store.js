// @flow

import type { Middleware } from 'redux'
import type { Store, Dispatch, State } from './type'

import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'

const history = createHistory()
const router: Middleware<*, *> = routerMiddleware(history)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store: Store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(router, thunk))
)

const dispatch: Dispatch = store.dispatch
const getState: () => State = store.getState

export { store as default, dispatch, getState, history }
