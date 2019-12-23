import React, { useState } from 'react'
import AddPerson from './components/AddPerson';
import People from './components/People'

const App = (props) => {
    const [persons, setPersons] = useState([ 
        { name: 'Arto Hellas', number: '123-123-123'}, 
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const addName = (event) => {
        event.preventDefault();
        const personObject = {
            name: newName,
            number: newNumber,
        }
    
        const searchPerson = person => person.name.toLowerCase() === newName.toLowerCase();
        const found = persons.find(searchPerson);

        if (found) {
            alert(`${newName} is already added to phonebook.`);
            setNewName('');
            setNewNumber('');
        }
        else {
            setPersons(persons.concat(personObject));
            setNewName('');
            setNewNumber('');
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <h3>Add a new</h3>
                <AddPerson newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addName={addName} />
            <h3>Numbers</h3>
                <People persons={persons}></People>
        </div>
    )
}

export default App