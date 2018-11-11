//@flow

import * as React from 'react'
import PropTypes from 'prop-types'

type Props = {
  foo: number,
  bar?: string,
};

export default class MyComponent extends React.Component<Props> {
  render() {
    const children = this.props.children
    return (
      <div>
        {children}
      </div>
    )
  }
}

MyComponent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
}
