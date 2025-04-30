import React, { useCallback, useState } from 'react'
import Child from './Child'

export default function Parent() {
    let [num1, setNum1] = useState(1)
    let [num2, setNum2] = useState(1)

    let childComponent = useCallback(<Child num1={num1} num2={num2} />,[num1])
    console.log("Parent Component is Rendered")
    return (
        <>
            <h1>useCallback Hook Example</h1>
            <h2>This is Parent Component</h2>
            <h3>num1 = {num1} | num2={num2}</h3>
            <button onClick={() => setNum1(num1 + 1)}>Increment Num1</button>
            <button onClick={() => setNum2(num2 + 1)}>Increment Num2</button>
            <hr />
            {childComponent}
        </>
    )
}
