import React, { Component } from "react"

// var name = "Nitin Chauhan"
// var arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
// var emp = {
//     id: 1001,
//     name: "Nitin Chauhan",
//     dsg: "Trainer",
//     salary: 156700,
//     city: "Faridabad",
//     state: "Haryana"
// }
// function display() {
//     return <h3>In display function</h3>
// }

// class ExportImportExample extends Component {
//     render() {
//         return (
//             <>
//                 <h1>Class Component Export Import Example</h1>
//                 <h2>This is ExportImortExample Class</h2>
//             </>
//         )
//     }
// }

// export default ExportImportExample          //Default Export
// export { name, arr, emp, display }          //Name Export

export var name = "Nitin Chauhan"
export var arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
export var emp = {
    id: 1001,
    name: "Nitin Chauhan",
    dsg: "Trainer",
    salary: 156700,
    city: "Faridabad",
    state: "Haryana"
}
export function display() {
    return <h3>In display function</h3>
}

export default class ExportImportExample extends Component {
    render() {
        return (
            <>
                <h1>Class Component Export Import Example</h1>
                <h2>This is ExportImortExample Class</h2>
            </>
        )
    }
}
