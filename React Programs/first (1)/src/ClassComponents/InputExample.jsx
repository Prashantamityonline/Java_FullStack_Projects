import React, { Component } from 'react'

export default class InputExample extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            phone: "",
            designation: "",
            salary: "",
            city: "",
            state: ""
        }
    }

    getInputData(e) {
        let { name, value } = e.target
        this.setState(() => {
            return {
                ...this.state,
                [name]: value
            }
        })
    }
    postSubmit(e) {
        e.preventDefault()
        alert(`
               Name             :   ${this.state.name}
               Email            :   ${this.state.email}
               Phone            :   ${this.state.phone}
               Designation      :   ${this.state.designation}
               Salary           :   ${this.state.salary}
               City             :   ${this.state.city}
               State            :   ${this.state.state}
            `)
    }
    render() {
        return (
            <>
                <div className="main">
                    <div className="center">
                        <h1>Class Component Input Example</h1>
                        <h2>Name  : {this.state.name}</h2>
                        <h2>Email  : {this.state.email}</h2>
                        <h2>Phone  : {this.state.phone}</h2>
                        <h2>Designation  : {this.state.designation}</h2>
                        <h2>Salary  : {this.state.salary}</h2>
                        <h2>City  : {this.state.city}</h2>
                        <h2>State  : {this.state.state}</h2>
                        <form onSubmit={(e) => this.postSubmit(e)}>
                            <input type="text" name="name" required onChange={(e) => this.getInputData(e)} placeholder='Full Name' />
                            <input type="email" name="email" required onChange={(e) => this.getInputData(e)} placeholder='Email Address' />
                            <input type="text" name="phone" required onChange={(e) => this.getInputData(e)} placeholder='Phone Number' />
                            <input type="text" name="designation" required onChange={(e) => this.getInputData(e)} placeholder='Designation' />
                            <input type="number" name="salary" required onChange={(e) => this.getInputData(e)} placeholder='Salary' />
                            <input type="text" name="city" required onChange={(e) => this.getInputData(e)} placeholder='City Name' />
                            <input type="text" name="state" required onChange={(e) => this.getInputData(e)} placeholder='State Name' />
                            <button type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}



// import React, { Component } from 'react'

// export default class InputExample extends Component {
//     constructor() {
//         super()
//         this.state = {
//             name: "",
//             email: "",
//             phone: "",
//             designation: "",
//             salary: "",
//             city: "",
//             state: ""
//         }
//     }

//     getInputData(e) {
//         let { name, value } = e.target
//         this.setState(() => {
//             return {
//                 ...this.state,
//                 [name]: value
//             }
//         })
//         // if (name === "name")
//         //     this.setState({ name: value })
//         // else if (name === "email")
//         //     this.setState({ email: value })
//         // else if (name === "phone")
//         //     this.setState({ phone: value })
//         // else if (name === "designation")
//         //     this.setState({ designation: value })
//         // else if (name === "salary")
//         //     this.setState({ salary: value })
//         // else if (name === "city")
//         //     this.setState({ city: value })
//         // else
//         //     this.setState({ state: value })
//     }
//     postSubmit() {
//         alert(`
//                Name             :   ${this.state.name}
//                Email            :   ${this.state.email}
//                Phone            :   ${this.state.phone}
//                Designation      :   ${this.state.designation}
//                Salary           :   ${this.state.salary}
//                City             :   ${this.state.city}
//                State            :   ${this.state.state}
//             `)
//     }
//     render() {
//         return (
//             <>
//                 <div className="main">
//                     <div className="center">
//                         <h1>Class Component Input Example</h1>
//                         <h2>Name  : {this.state.name}</h2>
//                         <h2>Email  : {this.state.email}</h2>
//                         <h2>Phone  : {this.state.phone}</h2>
//                         <h2>Designation  : {this.state.designation}</h2>
//                         <h2>Salary  : {this.state.salary}</h2>
//                         <h2>City  : {this.state.city}</h2>
//                         <h2>State  : {this.state.state}</h2>
//                         <input type="text" name="name" onChange={(e) => this.getInputData(e)} placeholder='Full Name' />
//                         <input type="email" name="email" onChange={(e) => this.getInputData(e)} placeholder='Email Address' />
//                         <input type="text" name="phone" onChange={(e) => this.getInputData(e)} placeholder='Phone Number' />
//                         <input type="text" name="designation" onChange={(e) => this.getInputData(e)} placeholder='Designation' />
//                         <input type="number" name="salary" onChange={(e) => this.getInputData(e)} placeholder='Salary' />
//                         <input type="text" name="city" onChange={(e) => this.getInputData(e)} placeholder='City Name' />
//                         <input type="text" name="state" onChange={(e) => this.getInputData(e)} placeholder='State Name' />
//                         <button onClick={() => this.postSubmit()}>Submit</button>
//                     </div>
//                 </div>
//             </>
//         )
//     }
// }



// import React, { Component } from 'react'

// export default class InputExample extends Component {
//     constructor(){
//         super()
//         this.state = {
//             name:""
//         }
//     }

//     getInputData(e){
//         this.setState({name:e.target.value})
//     }
//     postSubmit(){
//         alert(`
//                 Hello ${this.state.name}
//             `)
//     }
//     render() {
//         return (
//             <>
//                 <div className="main">
//                     <div className="center">
//                         <h1>Class Component Input Example</h1>
//                         <h2>Name  : {this.state.name}</h2>
//                         <input type="text" name="name" onChange={(e)=>this.getInputData(e)} placeholder='Full Name' />
//                         <button onClick={()=>this.postSubmit()}>Submit</button>
//                     </div>
//                 </div>
//             </>
//         )
//     }
// }
