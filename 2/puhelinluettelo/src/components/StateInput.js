import React from 'react'

const StateInput = (props) => (
  <input
    value={props.value}
    onChange={props.handleChange}
  />
)

export default StateInput
