import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0]
    }
  }

  getRandomAnecdote = () => {
      return () => { 
        this.setState({ selected: getRandom() })
      }
  }

  vote = (index) => {
    const newVotes = addVote(index, this.state.votes)

    return () => {
      this.setState({ 
        votes: newVotes
      })
    }
  }


  render() {
    return (
      <div>
        <h1>Anecdotes</h1>
        <Anecdote anecdotes={anecdotes} selected={this.state.selected} votes={this.state.votes[this.state.selected]} /> 
        <Button text="Random" handleClick={this.getRandomAnecdote()}/>
        <Button text="Vote" handleClick={this.vote(this.state.selected)} />
        <PopularAnecdote anecdotes={anecdotes} votes={this.state.votes} />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const addVote = (voted, votes) => {
  const newVotes = votes.slice()
  if(newVotes[voted]) {
    newVotes[voted] += 1
  } else {
    newVotes[voted] = 1
  }
  return (newVotes)
}

const getRandom = (limit) => (
  Math.floor((Math.random() * anecdotes.length))
)


const Anecdote = (props) => {
  const voteCount = props.votes ? props.votes : 0
  return (
    <div>
      <p>{props.anecdotes[props.selected]}</p>
      <p>Votes: {voteCount}</p>
    </div>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const getIndexOfMaxValue = (arr) => (
  arr.reduce( (maxSoFar, currentValue, index, array) => currentValue > array[maxSoFar] ? index : maxSoFar, 0 )
)

const PopularAnecdote = (props) => {
  const mostPopular = getIndexOfMaxValue(props.votes)
  
  if (props.votes[mostPopular] === 0){
    return (
      <div>
      </div>
    )
  }

  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <Anecdote anecdotes={props.anecdotes} selected={mostPopular} votes={props.votes[mostPopular]} />
    </div>
  )
}


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)