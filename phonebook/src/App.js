import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Persons'
import Notification from './components/Notification'

import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const getAllPhoneContacts = () => {

    phonebookService.getAll()
    .then(initialPersons => setPersons(initialPersons))
    .catch(error => {
      console.log('Error: ', error)
      updateErrorMsg(`${error.message}`)
    })

  }

  useEffect(getAllPhoneContacts, [])

  const updateErrorMsg = (msg) => {
    setErrorMsg(msg)
    setTimeout(() => { setErrorMsg(null)}, 5000)
  }

  const updateSuccessMsg = (msg) => {
    setSuccessMsg(msg)
    setTimeout(() => { setSuccessMsg(null)}, 5000)
  }

  const updateNumber = (id) => {

    getAllPhoneContacts()

    const person = persons.find((p) => p.id === id);

      if( typeof person === 'undefined' ) {
        updateErrorMsg(`Person contact to delete do not exist`)
        return
      }

      const updatedPerson = {...person, number: newNumber}
      
      phonebookService.update(updatedPerson).then( response => {
        console.log(`${person.name} updated to: `, response);
        updateSuccessMsg(`${person.name} updated`)
       
        getAllPhoneContacts()
       
  
      }).catch(error => {
       
        console.log('Error: ', error)
        updateErrorMsg(`Information of ${person.name} has already been removed from server`)
      })  
      
  }

  const addPerson = (event) => {
    event.preventDefault();

    if (!parseInt(newNumber)) {
      updateErrorMsg(`${newNumber} is not a valid phone number`)
      return
    }
    
    for (let i = 0; i < persons.length; i++) {
      const person = persons[i];
      
      if (person.name.toLowerCase() === newName.toLowerCase()) {
        if (person.number === newNumber) {         
          updateErrorMsg(`${newName} is already added to phonebook`)
          return
        } else {
          const confirmDelete = window.confirm(`${person.name} already added to phonebook. \nReplace the old number with a new one?`);
          if (!confirmDelete) return 
          updateNumber(person.id)
          return
        }
      }
      
    }
    
    const newPerson = {'name': newName, 'number': newNumber}

    phonebookService.create(newPerson).then( response => {
      console.log('New contact saved to backend: ', response);

      setPersons([...persons, response])
      updateSuccessMsg(`${newName} Added`)
      setNewName('')
      setNewNumber('')

    }).catch(error => {
      console.log('Error: ', error)
      
      if (error.hasOwnProperty('response') && 
          error.response.hasOwnProperty('data') && 
          error.response.data.hasOwnProperty('error') ) {

        updateErrorMsg(`${error.response.data.error}`)
        return

      }

      updateErrorMsg(`${error.message}`)
    })
  
  }

  const handleFilter = (event) => {
    const newFilter = event.target.value.toLowerCase();
    
      setNameFilter(newFilter)

      if (newFilter) {
        const newFilteredPersons = persons.filter( person => {
          return person.name.toLowerCase().includes(newFilter)
        })
        
        if (newFilteredPersons.length) setFilteredPersons(newFilteredPersons)
      } else {
        setFilteredPersons([])
      }
    
  }

  const handleDeletePerson = (id) => {

    getAllPhoneContacts()

    const person = persons.find((p) => p.id === id);

    if( typeof person === 'undefined' ) {
      updateErrorMsg(`User doest not exist`)
      return
    }

    const confirmDelete = window.confirm(`Delete ${person.name}`);
      
    if (!confirmDelete) return 

    phonebookService.remove(id).then( () => {
      console.log(`${person.name} deleted!`);
      getAllPhoneContacts()
      updateSuccessMsg(`${person.name} Deleted`)
    }).catch(error => {
      console.log('Error: ', error)
      updateErrorMsg(`${error.message}`)
    })
    
  }


  const handleNameChange = (e) => setNewName(e.target.value)

  const handleNumberChange = (e) => setNewNumber(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      { errorMsg ? <Notification classNames='error msg' message={errorMsg}/> : null }
      { successMsg ? <Notification classNames='success msg' message={successMsg}/>: null}
      <Filter filter={nameFilter} handleFilter={handleFilter}/>
      <h3>add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange}       handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h3>Numbers</h3>
      <Person filteredPersons={filteredPersons} persons={persons} deletePerson={handleDeletePerson}/>

    </div>
  )
}

export default App