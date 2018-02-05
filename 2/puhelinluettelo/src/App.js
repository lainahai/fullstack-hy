import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    const newPersons = this.state.persons.concat({name: this.state.newName})

    this.setState({ persons: newPersons,
                    newName: ''
                  })

  }

  handleInputChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form>
          <div>
            nimi: 
            <input 
              value={this.state.newName} 
              onChange={this.handleInputChange} 
            />
          </div>
          <div>
            <button type="submit" onClick={this.addPerson}>lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
          <ul>
            {this.state.persons.map(person => <Person key={person.name} name={person.name}/>)}
          </ul>
      </div>
    )
  }
}


const Person = ({ name }) => <li>{name}</li>

export default App