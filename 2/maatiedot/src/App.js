import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(
        response => {
          this.setState({countries: response.data})
        }
      )
  }

  handleFilterChange = (event) => {
    this.setState({filter: event.target.value})
  }

  handleShowSingle = (countryname) => {
    this.setState({ filter: countryname})
  }

  render() {
    const showCountries = this.state.countries.filter( (country) => (
      country.name.toLowerCase().includes(this.state.filter.toLowerCase())
    ))

    if(showCountries.length === 1){
      return (
        <div>
          <FilterInput value={this.state.filter} handleChange={this.handleFilterChange.bind(this)} />
          <SingleCountry country={showCountries[0]}/> 
        </div>
      )
    }

    if(showCountries.length > 10){
      return (
        <div>
          <FilterInput value={this.state.filter} handleChange={this.handleFilterChange.bind(this)} />
          <p>Too many results, please use a more specific filter.</p>
        </div>
      )
    }

    return (
      <div>
        <FilterInput value={this.state.filter} handleChange={this.handleFilterChange.bind(this)} />
        <Countries countries={showCountries} handleClick={this.handleShowSingle} />
      </div>
    )
  }
}

const FilterInput = (props) => {
  return (
    <div>
      Filter by name: 
      <input value={props.value} onChange={props.handleChange} />
    </div>
  )
}

const Countries = ({ countries, handleClick }) => {
  return (
    <div>
      <ul>
        {countries.map(country => <li onClick={() => handleClick(country.name)}>{country.name}</li>)}
      </ul>
    </div>
  )
}

const SingleCountry = ({country}) => {

  return (
    <div>
      <h2>{country.name} {country.nativeName}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <div>
        <img alt='Flag of a country' src={country.flag}/>
      </div>
    </div>
  )
}

export default App
