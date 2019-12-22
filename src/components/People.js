import React from 'react'
import Person from './Person'

const People = ({persons}) => {
    return persons.map(person => <Person key={person.name} person={person} />)
}

export default People;