import React from 'react'
import ReactDOM from 'react-dom'

const Osa = (props) => <p>{props.osa.nimi} {props.osa.tehtavia}</p>
const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>
const Sisalto = (props) => {
  const osat = props.kurssi.osat
  return(
    <div>
      {osat.map(osa => <Osa key={osa.id} osa={osa}/>)}
    </div>
  )
}

const Yhteensa = (props) => {
  const yhteensa = props.kurssi.osat.reduce((yhteensa, osa) => yhteensa + osa.tehtavia, 0)
  console.log('Tehtavia: ', yhteensa)
  
  return(
    <p>yhteensä {yhteensa} tehtävää</p>
  )
}

const Kurssi = (props) => {



  return (
    <div>
      <Otsikko kurssi={props.kurssi}/>
      <Sisalto kurssi={props.kurssi}/>
      <Yhteensa kurssi={props.kurssi}/>
    </div>
  )
}

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10,
        id: 1
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7,
        id: 2
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14,
        id: 3
      },
      {
        nimi: 'Map',
        tehtavia: 10,
        id: 4
      },
      {
        nimi: 'Reduce',
        tehtavia: 10,
        id: 5
      },
      {
        nimi: 'Testaus 1',
        tehtavia: 10,
        id: 6
      },
      {
        nimi: 'Testaus 2',
        tehtavia: 10,
        id: 7
      }
    ]
  }

  return (
    <div>
      <Kurssi kurssi={kurssi} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)