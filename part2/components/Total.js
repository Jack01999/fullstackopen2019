import React from 'react'

const Total = ({ course }) => {

    const total = course.parts.reduce( (sum, exercise) => {
        console.log("sum: ", sum);
        console.log("curr: ", exercise.exercises);
        let curr = exercise.exercises;
        return sum + curr
    }, 0);

    console.log(total);

    return (
        <div>
            <b>total of {total} exercises</b>
        </div>
    )
}

export default Total
