import React from 'react'
import Child from './Child'

export default function Parent() {
    let data = [
        { id: 1001, name: "Nitin Chauhan", dsg: "Trainer", salary: 167800, city: "Faridabad", state: "Haryana" },
        { id: 1002, name: "Sumit Verma", dsg: "Trainer", salary: 47800, city: "Noida", state: "UP" },
        { id: 1003, name: "Tarun Sagar", dsg: "Trainer", salary: 28000, city: "Noida", state: "UP" },
        { id: 1004, name: "Mohit Kumar", dsg: "Trainer", salary: 17800, city: "Noida", state: "UP" },
        { id: 1005, name: "Ajay Singh", dsg: "Manager", salary: 267800, city: "Kanpur", state: "UP" }
    ]
    return (
        <>
            <h1>Functional Component Example to Send Data from Parent to Child Component</h1>
            <h2>This is Parent Component</h2>
            <hr />
            <Child name="Nitin Chauhan" data={data} />
        </>
    )
}
