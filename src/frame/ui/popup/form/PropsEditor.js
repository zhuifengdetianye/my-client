// @flow

import type {
  Fields,
  FieldErrors
} from './formType'

import React from 'react'
import Boolean from './Boolean'
import Checkboxes from './Checkboxes'
import Select from './Select'
import JsonEditor from './JsonEditor'
import FileInput from './FileInput'
import ArrayEditor from './ArrayEditor'
import Input from './Input'

type Props = {
  fields?: Fields,
  values: any,
  errors?: FieldErrors,
  changeValue: (key: string, value: any) => void
}

export default class PropsEditor extends React.PureComponent<Props> {
  render () {
    const { fields, values, errors, changeValue } = this.props
    if (!fields || fields.length === 0) {
      return null
    }
    return fields.map((field, i) => {
      if (field.visible && field.visible(values)) {
        return null
      }
      const { key } = field
      if (field.type === 'boolean') {
        return (
          <Boolean
            key={i}
            field={field}
            values={values}
            onChange={value => {
              changeValue(key, value)
            }}
          />
        )
      } else if (field.type === 'checkboxes') {
        return (
          <Checkboxes
            key={i}
            field={field}
            values={values}
            onChange={e => {
              const roles = values[key] || []
              if (e.currentTarget.checked) {
                roles.push(e.currentTarget.value)
              } else {
                roles.splice(roles.indexOf(e.currentTarget.value), 1)
              }
              changeValue(key, [...roles])
            }}
          />
        )
      } else if (field.type === 'select') {
        return (
          <Select
            key={i}
            field={field}
            values={values}
            errors={errors}
            onChange={value => changeValue(key, value)}
          />
        )
      } else if (field.type === 'jsonEditor') {
        return (
          <JsonEditor
            key={i}
            field={field}
            values={values}
            onChange={value => changeValue(key, value)}
          />
        )
      } else if (field.type === 'file') {
        return (
          <FileInput
            key={i}
            field={field}
            image={values[field.key]}
            onChange={value => changeValue(key, value)}
          />
        )
      } else if (field.type === 'array') {
        return (
          <ArrayEditor
            key={i}
            field={field}
            values={values[key]}
            onChange={value => changeValue(key, value)}
          />
        )
      } else {
        return (
          <Input
            key={i}
            field={field}
            value={values[key]}
            onChange={value => {
              changeValue(key, value)
            }}
            errors={errors}
          />
        )
      }
    })
  }
}
