// @flow

import type { FieldValues, CheckboxesField } from './formType'

import React from 'react'
import styles from './Checkboxes.scss'

type Props = {
  field: CheckboxesField,
  values: FieldValues,
  onChange: (SyntheticEvent<HTMLInputElement>) => void
}

export default class Checkboxes extends React.PureComponent<Props> {
  render () {
    const { field, values, onChange } = this.props
    return (
      <div className={styles.field}>
        <div>{field.title}</div>
        {(field.items || []).map((item, i) => {
          return (
            <div key={i} className={styles.item}>
              <input
                className={styles.checkbox}
                type='checkbox'
                value={item.value || ''}
                checked={
                  !!(
                    values &&
                    values[field.key] &&
                    values[field.key].indexOf(item.value || '') > -1
                  )
                }
                onChange={onChange}
              />
              {(item.name || '')}
            </div>
          )
        })}
      </div>
    )
  }
}
