import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'


class AnecdoteList extends React.Component {


  render() {
    const anecdotes = this.props.store.getState().anecdotes

    const vote = (id, content) => {
      this.props.store.dispatch(addVote(id))
      this.props.store.dispatch(showNotification(`You voted for ${content}`))
      setTimeout(() => {
        this.props.store.dispatch(hideNotification())
      }, 5000)
    }


    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>
                vote
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default AnecdoteList
