import React from 'react'
import ReactDOM from 'react-dom'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      good: 0,
      bad: 0,
      neutral: 0
    }
  }

  voteGood = () => {
    this.setState({ good: this.state.good + 1 })
  }

  voteBad = () => {
    this.setState({ bad: this.state.bad + 1 })
  }

  voteNeutral = () => {
    this.setState({ neutral: this.state.neutral + 1 })
  }

  render(){
    return(
      <div>
        <h1>Unicafe</h1>
        <h2>Anna palautetta</h2>
        <VoteButton text="Hyvää" handleClick={this.voteGood} />
        <VoteButton text="Neutraali" handleClick={this.voteNeutral} />
        <VoteButton text="Pahaa" handleClick={this.voteBad} />
        <Statistics good={this.state.good} neutral={this.state.neutral} bad={this.state.bad} />
      </div>
    )
  }
}
  
const VoteButton = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => (
  <div>
    <h2>Statistiikka</h2>
    <p>Hyvää {props.good}</p>
    <p>Neutraali {props.neutral}</p>
    <p>Pahaa {props.bad}</p>
  </div>
)



ReactDOM.render(
  <App />,
  document.getElementById('root')
)
