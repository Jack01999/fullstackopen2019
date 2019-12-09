import React from 'react'

const Content = ({ course }) => {
    const content = () => 
        course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)

    return (
        <div>
            {content()}
        </div>
    )
}

export default Content
