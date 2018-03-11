import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    let style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    const { content, hidden } = this.props.notification

    if (hidden) {
      style = {
        display: 'none'
      }
    }

    return <div style={style}>{content}</div>
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
