// @flow

import { InputField, FieldErrors } from './formType'

import React from 'react'
import DateTime from './DateTime'

type Props = {
  field: InputField,
  value: string | Date,
  onChange: string => void,
  errors?: FieldErrors
}

export default class Input extends React.PureComponent<Props> {
  render () {
    const { field, value='', onChange, errors } = this.props
    const { key, title, type = 'text', placeholder = '', required = false } = field
    return (
      <div key={key}>
        <div>
          {title}
          <span>{required && '*'}</span>
          <span>{errors && errors[key]}</span>
        </div>
        {['text', 'password'].includes(type) && (
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={e => {
              onChange(e.currentTarget.value)
            }}
          />
        )}
        {['textarea'].includes(type) && (
          <textarea
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={e => {
              onChange(e.currentTarget.value)
            }}
          />
        )}
        {['date', 'datetime'].includes(type) && (
          <DateTime
            value={value}
            showTime={field.type === 'datetime'}
            onChange={(date: string) => onChange(date)}
          />
        )}
      </div>
    )
  }
}
