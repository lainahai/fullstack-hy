import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osat = [
    {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    },
    {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    },
    {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }
  ]

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto osat={osat} />
      <Yhteensa osat={osat} />
    </div>
  )
}

const Otsikko = (props) => {
    return (
      <div>
        <h1>{props.kurssi}</h1>
      </div>
    )
}

const Osa = (props) => {
  return (
    <p>{props.osa.nimi} {props.osa.tehtavia}</p>
  )
}

const Sisalto = (props) => {
  return (
    <div>
      <Osa osa={props.osat[0]}/>
      <Osa osa={props.osat[1]}/>
      <Osa osa={props.osat[2]}/>
    </div>
  )
}

const Yhteensa = (props) => {
  let summa = 0
  props.osat.forEach(osa => summa += osa.tehtavia)
  return (
    <div>
      <p>yhteensä {summa} tehtävää</p>
    </div>
  )
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
)
