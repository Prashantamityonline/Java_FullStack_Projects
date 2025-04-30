import React, { Component } from 'react'

export default class Child extends Component {
    render() {
        return (
            <>
                <h3>This is Child Component</h3>
                <h4>Name  : {this.props.name}</h4>
                <h4>Message : {this.props.message}</h4>
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
                            this.props.data.map((item, index) => {
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
}
