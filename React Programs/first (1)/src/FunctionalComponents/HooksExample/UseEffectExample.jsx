import React, { useEffect, useState } from 'react'

export default function UseEffectExample() {
    let [num1, setNum1] = useState(1)
    let [num2, setNum2] = useState(1)

    useEffect(() => {
        console.log("useEffect Without Dependency Array is Called")
    })
    useEffect(() => {
        console.log("useEffect With Empty Dependency Array is Called")
    }, [])
    useEffect(() => {
        console.log("useEffect With Dependency Array is Called")
    }, [num2])
    return (
        <>
            <h1>useEffectExample</h1>
            <h2>num1 = {num1} | num2={num2}</h2>
            <button onClick={() => setNum1(num1 + 1)}>Increment num1</button>
            <button onClick={() => setNum2(num2 + 1)}>Increment num2</button>
        </>
    )
}
