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

  // Jäi vähän epäselväksi että miten tämä oli tarkoitus tehdä, tässä ois nyt tämmönen.
  // Ymmärsin varmaan väärin koska aikaisempi tapa oli huomattavasti selkeämpi, ks. edellinen commit.
  vote = (type) => {
    if (type === "good") {
      return () => { 
        this.setState({ good: this.state.good + 1 })
      }
    }
    if (type === "bad") {
      return () => { 
        this.setState({ bad: this.state.bad + 1 })
      }
    }
    if (type === "neutral") {
      return () => { 
        this.setState({ neutral: this.state.neutral + 1 })
      }
    }
  }


  render(){
    return(
      <div>
        <h1>Unicafe</h1>
        <h2>Anna palautetta</h2>
        <VoteButton text="Hyvää" handleClick={this.vote("good")} />
        <VoteButton text="Neutraali" handleClick={this.vote("neutral")} />
        <VoteButton text="Pahaa" handleClick={this.vote("bad")} />
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

const Statistics = (props) => {
  const count = props.good + props.bad + props.neutral
  const score = (props.good - props.bad) / count
  const positive = props.good / count * 100 + " %"

  const Header = () => (
    <h2>Statistiikka</h2>
  )

  if (count === 0){
    return (
      <div>
        <Header />
        <p>Yhtään palautetta ei annettu</p>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <table>
        <tbody>
          <Statistic text="Hyvää" value={props.good} />
          <Statistic text="Neutraali" value={props.neutral} />
          <Statistic text="Pahaa" value={props.bad} />
          <Statistic text="Keskiarvo" value={score} />
          <Statistic text="Positiivisia" value={positive} />
        </tbody>
      </table>
    </div>
  )
}

const Statistic = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
