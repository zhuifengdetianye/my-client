// @flow

import type { BooleanField, FieldValues } from './formType'
import React from 'react'

type Props = {
  field: BooleanField,
  values: FieldValues,
  onChange: boolean => void
};

export default class Input extends React.PureComponent<Props> {
  render () {
    const { field, values, onChange } = this.props
    return (
      <div key={field.key}>
        <div>
          {field.title}
          <input
            type='checkbox'
            checked={values[field.key] || false}
            style={{
              width: 'auto',
              marginLeft: 5
            }}
            onChange={e => onChange(e.currentTarget.checked)}
          />
        </div>
      </div>
    )
  }
}
