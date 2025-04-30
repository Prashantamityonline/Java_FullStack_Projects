import React, { Component } from 'react'
import Child from './Child'

export default class Parent extends Component {
    constructor() {
        super()
        this.name = "Nitin Chauhan"
        this.data = [
            { id: 1001, name: "Nitin Chauhan", dsg: "Trainer", salary: 167800, city: "Faridabad", state: "Haryana" },
            { id: 1002, name: "Sumit Verma", dsg: "Trainer", salary: 47800, city: "Noida", state: "UP" },
            { id: 1003, name: "Tarun Sagar", dsg: "Trainer", salary: 28000, city: "Noida", state: "UP" },
            { id: 1004, name: "Mohit Kumar", dsg: "Trainer", salary: 17800, city: "Noida", state: "UP" },
            { id: 1005, name: "Ajay Singh", dsg: "Manager", salary: 267800, city: "Kanpur", state: "UP" }
        ]
    }
    render() {
        return (
            <>
                <h1>Class Component Example</h1>
                <h2>Sending Data From Parent to Child Component</h2>
                <h3>This is Parent Component</h3>
                <hr />
                <Child name={this.name} data={this.data} message="This Message is Sent from Parent Component" />
            </>
        )
    }
}
