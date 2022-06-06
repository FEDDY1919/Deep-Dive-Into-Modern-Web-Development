import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './Component/Country'

function App() {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [show, setShow] = useState(new Uint8Array(250))


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (e) => {
    console.log(e.target.value)
    setFilter(e.target.value)
  }

  const handleClick = (index) => {
    let temp = [...show]
    temp[index] = temp[index]?0:1
    setShow(temp)
  }
  return (
    <div>
      find countries<input onChange = {handleFilterChange}/>
      <div>
        <Country countries = {countries} filter = {filter} handleClick = {handleClick} show = {show} />
      </div>
    </div>
  );
}

export default App;
