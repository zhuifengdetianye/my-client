// @flow

import 'purecss/build/tables.css'
import 'purecss/build/buttons.css'
import 'purecss/build/menus.css'

import React from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import store, { history } from 'redux/store'
import { ConnectedRouter } from 'react-router-redux'
import ReactHintFactory from 'react-hint'
import 'react-hint/css/index.css'
import * as apiClient from './lib/apiClient'
import formPopup, { FormPopup } from 'frame/ui/popup/form'
import NoFlowCheckComp from 'frame/core/NoFlowCheckComp'
import { FormJsonEditor } from 'frame/ui/popup/form/JsonEditor'
import WithMenu from './Menu/WithMenu'
import Preview from './Preview/Preview'
import Search from './List/Search'
import Home from './Home'

const ReactHint = ReactHintFactory(React)

class App extends React.Component<*> {
  componentWillMount () {

  }

  componentDidMount() {

  }
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div id='router-root'>
            <NoFlowCheckComp comp={FormPopup} />
            <NoFlowCheckComp comp={FormJsonEditor} />
            <ReactHint events delay={100} />
            <WithMenu>
              <Route path='/' exact component={Home} />
              <Route path='/preview' component={Preview} />
              <Route path='/search' component={Search} />
            </WithMenu>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
