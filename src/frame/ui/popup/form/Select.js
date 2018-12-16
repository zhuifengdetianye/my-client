// @flow

import type { SelectField, FieldValues, FieldErrors } from './formType'

import React from 'react'

type Props = {
  field: SelectField,
  errors: ?FieldErrors,
  values: FieldValues,
  onChange: string => void
}

export default class Select extends React.PureComponent<Props> {
  render () {
    const { field, errors, values, onChange } = this.props
    return (
      <div>
        <div>
          {field.title}
          <span>*</span>
          <span>{errors && errors[field.key]}</span>
        </div>
        <select
          value={values[field.key] || ''}
          onChange={e => onChange(e.currentTarget.value)}
        >
          {<option value=''>请选择</option>}
          {field.options.map((option, i) => {
            let value = '';
            let text = '';
            if (typeof option === 'string') {
              value = option
              text = option
            } else {
              value = option.value
              text = option.text
            }
            return (
              <option key={i} value={value}>
                {text}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
}
