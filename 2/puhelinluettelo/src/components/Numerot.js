import React from 'react'


const Numerot = ({ persons, deletePerson }) => {
  return (
    <div>
      <h2>Numerot</h2>
      <table>
        <tbody>
          {persons.map(person => <Person key={person.name} person={person} deletePerson={deletePerson} />)}
        </tbody>
      </table>
     </div>
  )
}

const Person = ({ person, deletePerson }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
    <td>
      <button onClick={ () => deletePerson(person.id, person.name)}>Poista</button>
    </td>
  </tr>
)

export default Numerot