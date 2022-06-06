import { useState } from 'react'
import Form from "./components/Form"
import Person from './components/Person'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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

    else setPersons(persons.concat(personObject))
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
      <Person persons = {persons} filter = {filter}/>
    </div>
  )
}

export default App