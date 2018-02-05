import React from 'react'

const Kurssi = ({ kurssi }) => {

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
    
    return(
      <p>yhteensä {yhteensa} tehtävää</p>
    )
  }

  return (
    <div>
      <Otsikko kurssi={kurssi}/>
      <Sisalto kurssi={kurssi}/>
      <Yhteensa kurssi={kurssi}/>
    </div>
  )
}

export default Kurssi