import React from 'react'
import axios from 'axios'
import Numerot from './components/Numerot'
import StateInput from './components/StateInput'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentWillMount() {
    console.log('Fetching data from server')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response.data)
        this.setState({
          persons: response.data
        })
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    const newPersons = this.state.persons.concat({
      name: this.state.newName,
      number: this.state.newNumber
    })

    if(this.state.persons.find(person => person.name === this.state.newName)){
      alert('Henkilö '+ this.state.newName + ' on jo luettelossa')
    } else {
    this.setState({ persons: newPersons,
                    newName: '',
                    newNumber: '',
                    filter: ''
                  })
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }
  
  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {
    const filteredPersons = this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()))

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <h3>Lisää uusi numero</h3>
        <form>
          <div>
            nimi:
            <StateInput 
              value={this.state.newName}
              handleChange={this.handleNameChange}
            />
          </div>
           <div>
            numero:
            <StateInput 
              value={this.state.newNumber} 
              handleChange={this.handleNumberChange} 
            />
          </div>
          <div>
            <button type="submit" onClick={this.addPerson}>lisää</button>
          </div>
        </form>
        <h3>Rajaa numeroita</h3>
        <div>
          Etsi nimellä:
          <StateInput 
            value={this.state.filter}
            handleChange={this.handleFilterChange}
          />
          </div>
       <Numerot persons={filteredPersons} />
       </div>
    )
  }
}

export default App