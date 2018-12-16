// @flow

import React from 'react'
import { formatDate } from 'frame/core/format'

type Props = {
  value?: string | Date,
  onChange: (date: string) => void,
  showTime?: boolean
}

type State = {
  date: string,
  time: string
}
export default class DateTime extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)

    const { value } = this.props
    const date: Date =
      value instanceof Date ? value : value ? new Date(value) : new Date()
    console.log(formatDate(date, 'YYYY-MM-DD'))
    this.state = {
      date: formatDate(date, 'YYYY-MM-DD'),
      time: formatDate(date, 'HH:mm')
    }
  }

  componentWillMount () {
    if (!this.props.value) {
      this.onChange()
    }
  }

  onChange () {
    const { date, time } = this.state
    const { showTime } = this.props
    this.props.onChange(`${date} ${showTime ? time : '00:00'}`)
  }

  onDateChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      time: e.currentTarget.value
    }, this.onChange)
  }

  onTimeChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      time: e.currentTarget.value
    }, this.onChange)
  }

  render () {
    const { date, time } = this.state
    const { showTime } = this.props
    return (
      <div>
        <input
          key='date'
          type='date'
          value={date}
          onChange={this.onDateChange}
        />
        {showTime && <input
          key='time'
          type='time'
          value={time}
          onChange={this.onTimeChange}
        />}
      </div>
    )
  }
}
