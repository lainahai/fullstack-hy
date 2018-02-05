import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas',
          phone: '050-1234567' }
      ],
      newName: '',
      newPhone: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    const newPersons = this.state.persons.concat({
      name: this.state.newName,
      phone: this.state.newPhone
    })

    if(this.state.persons.find(person => person.name === this.state.newName)){
      alert('Henkilö '+ this.state.newName + ' on jo luettelossa')
    } else {
    this.setState({ persons: newPersons,
                    newName: '',
                    newPhone: ''
                  })

    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }
  
  handlePhoneChange = (event) => {
    this.setState({ newPhone: event.target.value })
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
              onChange={this.handleNameChange} 
            />
          </div>
           <div>
            numero:
            <input 
              value={this.state.newPhone} 
              onChange={this.handlePhoneChange} 
            />
          </div>
          <div>
            <button type="submit" onClick={this.addPerson}>lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
          <table>
            <tbody>
              {this.state.persons.map(person => <Person key={person.name} person={person}/>)}
            </tbody>
          </table>
      </div>
    )
  }
}


const Person = ({ person }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.phone}</td>
  </tr>
)

export default App