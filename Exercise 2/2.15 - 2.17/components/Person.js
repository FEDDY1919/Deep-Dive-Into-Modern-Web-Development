import React from "react";

const Person = ({persons,filter,handleDelete}) => { //have to pass in the filter
    
    //console.log(persons)
    console.log(filter)
    if (filter === ''){
      return(
      persons.map(person => 
        <p key = {person.id}>{person.name} {person.number}
        <button onClick = {()=>handleDelete(person.id)}>Delete</button>
        </p>
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