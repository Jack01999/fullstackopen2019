import React, { useState, useEffect } from 'react'
import AddPerson from './components/AddPerson'
import PersonService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'
import Footer from './components/Footer'

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    // Make call into the JSON file (db.json) and set the original "persons" list as whats provided in db.json
    useEffect(() => {
        PersonService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons);
            })
    }, []);

    // Add Name + Number onto the database(JSON) using the forms and submit button
    const addName = (event) => {
        event.preventDefault();
        // Create a new object with the inputs in the forms as the new name/number
        const personObject = {
            name: newName.trim(),
            number: newNumber,
        }
    
        // Look and see if that name already exists in the phonebook.
        const searchPerson = person => person.name.toLowerCase().trim() === newName.toLowerCase().trim();
        const found = persons.find(searchPerson);

        // If the name exists in the phonebook, you are given the option to update that person's phone number. (json file: URL/id)
        if (found) {
            if (window.confirm(`${newName.trim()} is already in the phonebook, replace the old number with a new one?`)) {
                PersonService
                    .update(found.id, personObject)
                    .then(newNumber => {
                        setPersons(persons.map(person => person.id !== found.id ? person : newNumber))
                    });
                setMessage(
                    `${newName}'s number has been changed to ${newNumber}`
                )
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
                setNewName('');
                setNewNumber('');
            }
            
        }
        
        // If the name does not exist in the phonebook yet, add it to the phonebook (json file)
        else {
            PersonService
                .create(personObject)
                .then(data => {
                    setPersons(persons.concat(data))
                    setNewName('');
                    setNewNumber('');
            })
            setMessage(
                `Added ${newName}`
            )
            setTimeout(() => {
            setMessage(null)
            }, 5000)
        }
    }

    // Remove the name + number entirely from json file (URL/id) if 'delete' button is pressed.
    const handleDeleteChange = (person) => {
        if (window.confirm(`Delete ${person.name} (id: ${person.id}) ?`)) {
          PersonService
            .deleteID(person.id)
            .catch(error => {
                setErrorMessage(
                    `Information of ${person.name} has already been removed from the server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setPersons(persons.filter(p => p.id !== person.id))
            })
            setPersons(persons.filter(delPerson => delPerson.id !== person.id))
            setErrorMessage(
                `Information of ${person.name} has been removed from the server`
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }

      }

    // Get the update value inside the 'name' form/input. (re-renders)
    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    // Get the update value inside the 'number' form/input. (re-renders)
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    const phonebook = () => {
        return (
            persons.map(person => <li key={person.name}>{person.name} {person.number} <button onClick={() => { handleDeleteChange(person) }}>delete</button> </li>)
        )
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} />
            <Error message={errorMessage} />
            <h3>Add a new</h3>
                <AddPerson newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addName={addName} />
            <h3>Numbers</h3>
                {phonebook()}
            <Footer />
        </div>
    )
}

export default App