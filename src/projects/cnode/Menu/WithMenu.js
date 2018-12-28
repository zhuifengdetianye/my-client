// @flow

import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import TopMenu from './TopMenu'

@withRouter
export default class extends React.PureComponent<*> {
  render () {
    const { children, location } = this.props
    console.log(location)
    return (
      <div>
        <TopMenu />
        <div>
          {children}
        </div>
        <div>
          <Link to='/js-demo'>示例</Link>
          <Link to='/preview'>预览</Link>
        </div>
      </div>
    )
  }
}
