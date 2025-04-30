import React from 'react'
import { useParams } from 'react-router-dom'

export default function Profile() {
    let {name,salary,dsg} = useParams()
    return (
        <>
            <h1>This is Profile Page</h1>
            {name ? <h2>Name : {name}</h2> : null}
            {salary ? <h2>Salary : {salary}</h2> : null}
            {dsg ? <h2>Designation : {dsg}</h2> : null}
        </>
    )
}
