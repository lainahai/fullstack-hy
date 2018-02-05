import React from 'react'

const Numerot = ({ persons }) => {
  return (
    <div>
      <h2>Numerot</h2>
      <table>
        <tbody>
          {persons.map(person => <Person key={person.name} person={person}/>)}
        </tbody>
      </table>
     </div>
  )
}

const Person = ({ person }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
  </tr>
)

export default Numerot