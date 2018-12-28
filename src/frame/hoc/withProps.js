// @flow

import * as React from 'react'

type CreateProps = (ownerProps: { [string]: any }) => {}

export default function (createProps: CreateProps) {
  return function (WrappedComponent: React.Component<*>) {
    return function (oriProps: *) {
      console.log(oriProps)
      const props = {
        ...oriProps,
        ...createProps(oriProps)
      }
      return <WrappedComponent {...props} />
    }
  }
}
