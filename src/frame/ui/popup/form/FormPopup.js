// @flow

import type { Fields } from './PropsEditor'

import React from 'react'
import { connect } from 'react-redux'
import PropsEditor from './PropsEditor'
import styles from './FormPopup.scss'
import { isRequired, isRegex } from './formType'

export const FORM_POPUP_KEY = 'formPopup'

export type FieldValues = {
  [string]: ?string | Array<string> | boolean | Date
};

export type FieldErrors = { [string]: string };

export type FormProps = {
  title: string,
  fields: Fields,
  validator?: (fieldObject: FieldValues) => ?FieldErrors | Promise<FieldErrors>,
  defaultValues?: FieldValues
};

type Props = {
  formProps: FormProps,
  onCancel: Function,
  onOk: FieldValues => void
}

function mapStateToProps (state) {
  const props = state.map.get(FORM_POPUP_KEY)
  return { ...props }
}

@connect(mapStateToProps)
export default class FormPopupWrapper extends React.PureComponent<*> {
  render () {
    const { formProps } = this.props
    if (!formProps) {
      return null
    }
    return <FormPopup {...this.props} />
  }
}

type State = {
  ...FieldValues,
  errors: ?FieldErrors
}

class FormPopup extends React.PureComponent<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      ...(props.formProps.defaultValues || {}),
      errors: null
    }
    console.log(props.formProps)
  }

  onCancel = () => {
    this.props.onCancel()
  };

  onOk =() => {
    const { formProps, onOk } = this.props
    const { errors, ...values } = this.state

    const setError = (key: string, error: string) => {
      const errors = this.state.errors
      this.setState({
        errors: {
          ...errors,
          [key]: error
        }
      })
    }

    //验证是否必填和正则表达式
    for (let i = 0; i < formProps.fields.length; i++) {
      const field = formProps.fields[i]
      if (isRegex(field)) {
        const { key, regex, regexError } = field
        if (regex && !regex.test(values[key])) {
          setError(key, regexError || '不符合要求')
          return
        }
      }
      if (isRequired(field)) {
        const { key, required } = field
        if (required && !values[key]) {
          setError(key, '必填项')
          return
        }
      }
    }

    // 校验函数
    const { validator } = formProps
    if (!validator) {
      return onOk(values)
    }

    Promise.resolve(validator(values)).then((errors: ?FieldErrors) => {
      this.setState({ errors })

      if (!errors) {
        onOk(values)
      }
    })
  };

  changeValue = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  render () {
    const { formProps: { title, fields } } = this.props
    const { errors, ...values } = this.state
    return (
      <div className={styles.this}>
        <div className={styles.shade} />
        <div className={styles.main}>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.content}>
            <PropsEditor
              values={values}
              errors={errors}
              changeValue={this.changeValue}
              fields={fields}
            />
          </div>
          <div
            className={styles.button}
            style={{ padding: '10px 0', fontSize: 18 }}
          >
            <div className={styles.cancel}>
              <span onClick={this.onCancel}>取消</span>
            </div>
            <div>
              <span onClick={this.onOk}>确定</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
