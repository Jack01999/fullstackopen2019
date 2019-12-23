import React from 'react'

const Languages = ({ languages }) => {
    const findAllLanguages = () => languages.map(language => <li key={language.name}>{language.name}</li>);

    return (
        <ul>
            {findAllLanguages()}
        </ul>
    )
}

export default Languages;