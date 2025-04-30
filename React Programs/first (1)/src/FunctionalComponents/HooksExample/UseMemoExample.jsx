import React, { useMemo } from 'react'
import { useState } from 'react'

function getCaulation(count) {
    let sum = 0
    for (let i = 1; i < 500000000 + count; i++) {
        sum = sum + i
    }
    return sum
}
export default function UseMemoExample() {
    let [num1, setNum1] = useState(1)
    let [num2, setNum2] = useState(1)
    let sum = useMemo(() => getCaulation(num2), [num2])
    return (
        <>
            <h1>useMemo Hook Example</h1>
            <h2>num1 = {num1} | num2 = {num2}</h2>
            <h2>sum = {sum}</h2>
            <button onClick={() => setNum1(num1 + 1)}>Increment num1</button>
            <button onClick={() => setNum2(num2 + 1)}>Increment num2</button>
        </>
    )
}

