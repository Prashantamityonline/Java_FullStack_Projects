import React, { useState } from 'react'

export default function StateExampleF() {
    let [num, setNum] = useState(1)
    console.log("Functional Component is Renderd")
    return (
        <>
            <h1>Functional Component State Example</h1>
            <h2>num = {num}</h2>
            <button onClick={() => num > 1 ? setNum(num - 1) : null}>Decrement</button>
            <button onClick={() => setNum(num + 1)}>Increment</button>
        </>
    )
}


// import React, { useState } from 'react'

// export default function StateExampleF() {
//     let [num, setNum] = useState(1)

//     function decrement() {
//         setNum(num - 1)
//     }
//     function increment() {
//         setNum(num + 1)
//     }
//     console.log("Functional Component is Renderd")
//     return (
//         <>
//             <h1>Functional Component State Example</h1>
//             <h2>num = {num}</h2>
//             <button onClick={() => decrement()}>Decrement</button>
//             <button onClick={() => increment()}>Increment</button>
//         </>
//     )
// }
