import React from 'react'

function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  )
}

export default class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.inputElement = React.createRef()
  }

  componentDidMount() {
    this.inputElement.current.focus()
  }

  render() {
    return (
      <CustomTextInput inputRef={this.inputElement} />
    )
  }
}
