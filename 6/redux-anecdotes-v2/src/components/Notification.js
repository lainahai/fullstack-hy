import React from 'react'

class Notification extends React.Component {

  render() {
    let style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    if (this.props.store.getState().notification.hidden){
      style = {
        display: 'none'
      }
    }

    return (
      <div style={style}>
        {this.props.store.getState().notification.content}
      </div>
    )
  }
}

export default Notification
