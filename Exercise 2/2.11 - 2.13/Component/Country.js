import React  from "react";
import CountryView from './CountryView'


const Country = ({countries,filter,handleClick,show}) => {
    
    const count = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())).length
    const countriestoprint = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))


    if(filter === '') {
       return (
       <div></div>
      )
    }

    else if(count > 10){
    return <div> Too many matches, specify another filter</div>
    }
    //countries.findIndex(object =>  object.name.common === 'Botswana')

    else if (count < 10 && count > 1){
        return(countriestoprint.map(country =>
        <div key = {country.name.common}>
            {country.name.common}
            <button onClick = {()=>handleClick(countries.findIndex(object =>  object.name.common === country.name.common))}> {show[countries.findIndex(object =>  object.name.common === country.name.common)] ? "hide" : "show"} </button>
            {show[countries.findIndex(object =>  object.name.common === country.name.common)] ? <CountryView country = {country}/> : <div></div>}
        </div>)
      )
    }
    else {
      const country = countriestoprint[0]
      console.log(countriestoprint)
      return(
      <CountryView country = {country}/>
      )
    }
}

export default Country