import React from 'react'

export default function Child({ num1, num2 }) {
    console.log("Child Component is Rendered")
    return (
        <>
            <h2>This is Child Component</h2>
            <h3>num1 = {num1} | num2={num2}</h3>
        </>
    )
}
