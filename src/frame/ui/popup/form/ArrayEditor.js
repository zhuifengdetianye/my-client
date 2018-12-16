// @flow

import type { ArrayField } from './formType'

import React from 'react'
import PropsEditor from './PropsEditor'

type Props = {
  field: ArrayField,
  values?: Array<{ [string]: any }>,
  onChange: (Array<any>) => void,
}

type State = {
  isFold: boolean
}

export default class ArrayEditor extends React.PureComponent<Props, State> {
  state = {
    isFold: false
  };

  addItem = () => {
    let { onChange, values = [] } = this.props
    values.push({})
    onChange([...values])
  }
  removeItem = (i: number) => {
    let { onChange, values = [] } = this.props
    values.splice(i, 1)
    onChange([...values])
  }
  move = (index: number, offset: number) => {
    let { onChange, values = [] } = this.props
    let temp = values.splice(index, 1)[0]
    values.splice(index + offset, 0, temp)
    onChange([...values])
  }

  render () {
    const { field, values = [], onChange } = this.props
    const { key, title, item } = field
    const { isFold } = this.state;
    return (
      <div>
        <fieldset>
          <legend
            onClick={() => {
              this.setState({
                isFold: !isFold
              })
            }}
          >
            {title}{'  '}
            <i className={`fa ${isFold ? 'fa-angle-up' : 'fa-angle-down'}`} />
          </legend>
          { !isFold &&
            values.map((obj, i) => {
              let btnShow = this.state['btn' + i + 'Show']
              return (
                <div
                  key={i}
                  onMouseOver={this.setState({ ['btn' + i + 'Show']: true })}
                  onMouseOut={this.setState({ ['btn' + i + 'Show']: false })}
                >
                  <PropsEditor
                    fields={item}
                    values={obj}
                    changeValue={(key, value) => {
                      values[i] = { ...values[i], ...{ [key]: value }}
                      onChange([...values])
                    }}
                  />
                  <div style={{display: btnShow ? 'block' : 'none'}}>
                    <button
                      onClick={() => {
                        this.removeItem(i)
                      }}
                    >
                      <i className='fa fa-times' /> 删除
                    </button>
                    { i > 0 && (
                        <button
                          onClick={() => {
                            this.move(i, -1)
                          }}
                        >
                          <i className='fa fa-angle-up' /> 上移
                        </button>
                      )
                    }
                    { i < values.length - 1 && (
                        <button
                          onClick={() => {
                            this.move(i, 1)
                          }}
                        >
                          <i className='fa fa-angle-down' /> 下移
                        </button>
                      )
                    }

                  </div>
                </div>
              )
            })
          }
          <button onClick={this.addItem}>
            <i className='fa fa-plus'/> 添加
          </button>
        </fieldset>
      </div>
    )
  }
}
