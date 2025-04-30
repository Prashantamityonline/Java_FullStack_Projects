import React from 'react'

export default function ArrayOfObjectsF() {
    let data = [
        { id: 1001, name: "Nitin Chauhan", dsg: "Trainer", salary: 167800, city: "Faridabad", state: "Haryana" },
        { id: 1002, name: "Sumit Verma", dsg: "Trainer", salary: 47800, city: "Noida", state: "UP" },
        { id: 1003, name: "Tarun Sagar", dsg: "Trainer", salary: 28000, city: "Noida", state: "UP" },
        { id: 1004, name: "Mohit Kumar", dsg: "Trainer", salary: 17800, city: "Noida", state: "UP" },
        { id: 1005, name: "Ajay Singh", dsg: "Manager", salary: 267800, city: "Kanpur", state: "UP" }
    ]
    return (
        <>
            <h1>Functional Component Example</h1>
            <h2>Array of Objects</h2>
            <table border={2} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Salary</th>
                        <th>City</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => {
                            return <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.dsg}</td>
                                <td>{item.salary}</td>
                                <td>{item.city}</td>
                                <td>{item.state}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>
    )
}
