// @flow

import type { Item } from './type'
import type { ContextRouter } from 'react-router'

import * as React from 'react'
import Grid from './Grid'
import * as da from './redux/da'
import { connect } from 'react-redux'
import * as stateUtil from './redux/state'

function mapStateToProps () {
  return {
    list: stateUtil.getItemList()
  }
}

type Props = ContextRouter & {
  list: Item[]
}

@connect(mapStateToProps)
export default class extends React.PureComponent<Props> {
  render () {
    return (
      <div>
        search
        <a onClick={da.addItem}>创建新页面</a>
        <Grid/>
      </div>
    )
  }
}
