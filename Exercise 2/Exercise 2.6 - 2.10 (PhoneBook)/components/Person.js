import React from "react";

const Person = ({persons,filter}) => { //have to pass in the filter
    
    //console.log(persons)
    console.log(filter)
    console.log(persons.filter(person=>person.name.includes(filter)))
    if (filter === ''){
      return(
      persons.map(person => 
        <p key = {person.id}>{person.name} {person.number}</p>
      ))
    }
    else{
      return(
      persons.filter(person=>person.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
        <p key = {person.id}>{person.name} {person.number}</p>
         )
      )
    }
}

export default Person