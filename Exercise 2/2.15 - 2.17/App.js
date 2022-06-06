import { useState, useEffect } from 'react'
import Form from "./components/Form"
import Person from './components/Person'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    personService.getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }, [])
  

  const handleDelete = (id) => {
    if(window.confirm("Delete?")){ 
      personService.remove(id)
      .then(returnedPerson => {
        console.log(returnedPerson)
        setPersons(persons.concat(returnedPerson))
      })
      window.location.reload()
    }
    else return
  }

  const handleNameChange = (e) => {
    console.log(e.target.value)
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    console.log(e.target.value)
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) =>{
    console.log(e.target.value)
    setFilter(e.target.value)
  }


  const addNewName = (e) =>{

    e.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    if (persons.find(person => person.name === newName)){
      alert(newName + 'is already added to phonebook')
    }

    else {
     personService.create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {/* <div>
          filter shown with: <input onChange = {handlefilterChange}/>
      </div> */}
      <Filter handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <Form newName = {newName} newNumber = {newNumber} handleNameChange = {handleNameChange}  handleNumberChange = {handleNumberChange} addNewName = {addNewName} />
      <h2>Numbers</h2>
      <Person persons = {persons} filter = {filter} handleDelete = {handleDelete}/>
    </div>
  )
}

export default App