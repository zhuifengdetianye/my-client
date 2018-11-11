// @flow

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import store, { history } from 'redux/store'
import { ConnectedRouter } from 'react-router-redux'
import Preview from './Preview/Preview'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div id='router-root'>
            <Switch>
              <Route path='/preview' component={Preview}/>
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
