// @flow

import * as React from 'react'

type Props = {
  comp: React.ComponentType<*>
};

// 解决flow报错的问题
export default class extends React.Component<Props> {
  render () {
    const { comp, ...rest } = this.props
    return React.createElement(comp, {
      ...rest
    })
  }
}
