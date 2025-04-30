import React, { useState } from 'react'
import Child from './Child'

export default function Parent() {
    let [data, setData] = useState([])

    function getData(input) {
        setData(input)
    }
    return (
        <>
            <h1>Functional Component Example to Send Data from Child to Parent Component</h1>
            <h2>This is Parent Component</h2>
            {
                data.length ?
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
                    </table> : null
            }
            <hr />
            <Child getData={getData}/>
        </>
    )
}
