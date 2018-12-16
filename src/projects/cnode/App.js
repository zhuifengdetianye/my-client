// @flow

import 'purecss/build/tables.css'
import 'purecss/build/buttons.css'
import 'purecss/build/menus.css'

import React from 'react'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import store, { history } from 'redux/store'
import { ConnectedRouter } from 'react-router-redux'
import ReactHintFactory from 'react-hint'
import 'react-hint/css/index.css'
import * as apiClient from './lib/apiClient'
import formPopup, { FormPopup } from 'frame/ui/popup/form'
import NoFlowCheckComp from 'frame/core/NoFlowCheckComp'
import Preview from './Preview/Preview'
import { FormJsonEditor } from 'frame/ui/popup/form/JsonEditor'

const ReactHint = ReactHintFactory(React)

class App extends React.Component<*> {
  componentWillMount () {
    formPopup(
      {
        title: '添加标签',
        fields: [
          {
            title: '标签名',
            key: 'label',
            type: 'boolean',
            // visible: value => value.label
          },
          {
            title: 'input输入框',
            key: 'myInput',
            placeholder: '请输入',
            required: true
          }
        ],
        validator: ({ myInput }) => {
          if (myInput === '123') {
            return {
              myInput: '有问题'
            }
          }
        }
      }
    )
    .then((values) => {
      console.log(values)
    })
    .catch(e => {
      if (e.message !== 'cancel') {
        console.log(e)
      }
    })
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
            <Switch>
              <Route path='/preview' component={Preview}/>
            </Switch>
            <div className='acediff' />
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
