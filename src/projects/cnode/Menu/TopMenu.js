// @flow

import type { ContextRouter } from 'react-router'

import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { history } from 'redux/store'
import qs from 'qs'
import { compose } from 'redux'
import withProps from 'frame/hoc/withProps'

import styles from './TopMenu.scss'


type Props = ContextRouter & {
  condition: Object
}
type State = {

}
class TopMenu extends  React.PureComponent<Props, State> {
  render () {
    const { condition } = this.props
    const links = [
      ['search', 'h5', 'H5 页面'],
      ['search', 'pc', 'PC 页面'],
      ['/complex/list', '复杂组件']
    ]
    return (
      <div className={styles.container}>
        <div className={styles.home}>
          <Link to='/'>首页</Link>
        </div>
        <div className={styles.menu}>
          {links.map(link => {
            if (link[0] === 'search') {
              return (
                <a
                  key={link[1]}
                  onClick={() => {
                    condition.platform = link[1]
                    history.push({
                      pathname: './search',
                      search: qs.stringify(condition)
                    })
                  }}
                >
                  {link[2]}
                </a>
              )
            } else {
              return (
                <Link
                  key={link[0]}
                  to={link[0]}
                >
                  {link[1]}
                </Link>
              )
            }
          })}
        </div>
      </div>
    )
  }
}

//单纯的TopMenu是没有props的，这里需要给它绑定属性

export default compose(
  withRouter,
  withProps(function (props) {
    const { pathname, search } = props.location
    return {
      pathname,
      condition:
        pathname && pathname.indexOf('/search') === 0
          ? qs.parse(search.substr(1))
          : {}
    }
  })
)(TopMenu)
