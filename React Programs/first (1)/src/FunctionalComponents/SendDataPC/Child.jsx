import React from 'react'

export default function Child(props) {
    return (
        <>
            <h2>This is Child Component</h2>
            <h3>Name : {props.name}</h3>
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
                        props.data.map((item, index) => {
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
