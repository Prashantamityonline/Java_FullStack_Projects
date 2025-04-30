import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'

export default function UseRefExample() {
    let [name, setName] = useState("")
    let email = useRef("")

    function postData() {
        alert(`
                Name    :   ${name}
                Email   :   ${email.current}
            `)
    }
    console.log("Component is Rendered")
    return (
        <>
            <h1>useRef Example</h1>
            <h2>Name : {name}</h2>
            <h3>Email : {email.current}</h3>
            <input type="text" name="name" onChange={(e) => setName(e.target.value)} placeholder='Full Name' />
            <input type="email" name="email" onChange={(e) => email.current = e.target.value} placeholder='Email Address' />
            <button onClick={postData}>Submit</button>
        </>
    )
}
