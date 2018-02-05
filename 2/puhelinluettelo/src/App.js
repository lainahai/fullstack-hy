import React from 'react'
import Numerot from './components/Numerot'
import StateInput from './components/StateInput'
import numberService from './services/numbers'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      message: null
    }
  }

  componentWillMount() {
    numberService
      .getAll()
      .then(response => {
        this.setState({
          persons: response.data
        })
      })
  }

  showMessage(message, error=false) {
    this.setState({ message: message,
                    error: error})
    setTimeout(() => {
      this.setState({message: null})
    }, 5000)
  }



  addPerson = (event) => {
    event.preventDefault()

    const oldPerson = this.state.persons.find(person => person.name === this.state.newName)

    if(oldPerson){
      if(window.confirm(this.state.newName + ' on jo luettelossa. Haluatko korvata sen?')){
        numberService
          .update(oldPerson.id, { name: this.state.newName,
                                  number: this.state.newNumber
          })
          .then(response => {
            const newPersons = this.state.persons.filter(person => person.id !== response.data.id).concat(response.data)
            this.setState({ persons: newPersons,
              newName: '',
              newNumber: '',
              filter: ''
            })
            this.showMessage('Korvattiin ' + response.data.name)
          })
          .catch(error => {
            this.showMessage('Valtiettavasti joku ehti jo poistaa henkilon ' + oldPerson.name, true)
          })
      }
    } else {
      const newPerson = { name: this.state.newName,
                          number: this.state.newNumber
                        }
      
      numberService
        .create(newPerson)
        .then(response => {  
          const newPersons = this.state.persons.concat(response.data)
          this.setState({ persons: newPersons,
                          newName: '',
                          newNumber: '',
                          filter: ''
                        })
          this.showMessage('Lisättiin ' + response.data.name )
        })
    }
  }

  deletePerson = (id, name) => {
    if(window.confirm('Are you sure you want to delete ' + name)){
      numberService
        .deleteOne(id)
        .then( response => {
          const newPersons = this.state.persons.filter(person => person.id !== id)
          this.setState({persons: newPersons})
        })
        this.showMessage('Poistettiin ' + name)
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
        <Notification message={this.state.message} />
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
       <Numerot persons={filteredPersons} deletePerson={this.deletePerson.bind(this)} />
       </div>
    )
  }
}

const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }
  let className = 'success'
  if(error) {
    className = 'error'
  }
  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default App