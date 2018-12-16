// @flow

import type { JsonField } from './formType'

import React from 'react'
import JSONEditor from 'jsoneditor'
import { connect } from 'react-redux'
import { dispatch } from 'redux/store'
import { setMap } from 'redux/action'

import 'jsoneditor/dist/jsoneditor.css'

type Props = {
  field: JsonField,
  onChange: (value: any) => void,
  values: any
};

type State = {
  showAlert: boolean
};

export default class extends React.PureComponent<Props, State> {
  state = {
    showAlert: false
  }

  showJsonEditor = () => {
    const { field, onChange, values } = this.props
    dispatch(
      setMap('formJsonEditor', {
        show: true,
        jsonValue: values[field.key],
        field: field.key,
        updateJsonValue: onChange
      })
    )
  }

  render () {
    const title = this.props.field.title
    return (
      <div>
        {title} <a onClick={this.showJsonEditor}>json editor</a>
      </div>
    )
  }
}

type JsonProps = {
  show: boolean,
  jsonValue: ?any,
  updateJsonValue: (value: any) => void,
  field: string
}

function mapStateToProps (state) {
  const props = state.map.get('formJsonEditor')
  return {
    ...props
  }
}

@connect(mapStateToProps)
export class FormJsonEditor extends React.PureComponent<JsonProps> {
  hideJsonEditor = () => {
    dispatch(
      setMap('formJsonEditor', {
        show: false,
        jsonValue: []
      })
    )
  }

  render () {
    const { show, jsonValue, updateJsonValue, field } = this.props
    if (!show) {
      return null
    }
    return (
      <div>
        <div onClick={this.hideJsonEditor}>
          <i className='fa fa-times' />
        </div>
        <PureJsonEditor
          jsonValue={jsonValue}
          updateJsonValue={updateJsonValue}
          editorKey={field}
        />
      </div>
    )
  }
}

type PureJsonEditorProps = {
  jsonValue: any,
  updateJsonValue: (jsonValue: any) => void,
  editorKey: string
}

export class PureJsonEditor extends React.Component<PureJsonEditorProps> {
  editor: any;
  componentDidMount () {
    const { jsonValue, updateJsonValue } = this.props
    const options = {
      mode: 'code',
      statusBar: true,
      onChange: () => {
        try {
          console.log(this.editor.get())
          updateJsonValue(this.editor.get())
        } catch (e) {

        }
      }
    }
    this.editor = new JSONEditor(this.refs.jsonEditor, options, jsonValue)
  }

  shouldComponentUpdate (nextProps: PureJsonEditorProps) {
    return this.props.editorKey !== nextProps.editorKey
  }

  componentWillUpdate (nextProps: PureJsonEditorProps) {
    this.editor.set(nextProps.jsonValue)
  }
  render () {
    return <div ref='jsonEditor' style={{ height: '100%', width: '100%'}} />
  }
}
