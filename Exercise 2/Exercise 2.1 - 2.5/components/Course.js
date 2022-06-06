import React from 'react';

const Course = ({courses}) => {


    return (
    <div>
        {courses.map(course => 
        <div key = {course.id}>

        <h1>{course.name}</h1>

            {course.parts.map(course => 
            <p key={course.id}>
                {course.name} {course.exercises}
            </p>
            )}

        <p>total of {course.parts.reduce((accumulator,value) => accumulator + value.exercises,0)} exercises</p>

        </div>
        )}
    </div>

    )
}

export default Course