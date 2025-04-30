import React, { Component } from 'react'
import Child from './Child'

export default class Parent extends Component {
    constructor() {
        super()
        this.state = {
            num1: 1,
            num2: 1
        }
    }

    increment1() {
        this.setState({ num1: this.state.num1 + 1 })
    }
    increment2() {
        this.setState({ num2: this.state.num2 + 1 })
    }
    render() {
        console.log("Parent Component is Rendered")
        return (
            <>
                <h1>shouldComponentUpdate Vs PureComonent Example</h1>
                <h2>This is Parent Component</h2>
                <h3>num1 = {this.state.num1} | num2 = {this.state.num2}</h3>
                <button onClick={()=>this.increment1()}>Increment num1</button>
                <button onClick={()=>this.increment2()}>Increment num2</button>
                <hr />
                <Child num1={this.state.num1} num2={this.state.num2}/>
            </>
        )
    }
}



// import React, { Component } from 'react'
// import Child from './Child'

// export default class Parent extends Component {
//     constructor() {
//         super()
//         this.state = {
//             num: 1
//         }
//     }

//     increment() {
//         this.setState({ num: this.state.num + 1 })
//     }
//     render() {
//         console.log("Parent Component is Rendered")
//         return (
//             <>
//                 <h1>shouldComponentUpdate Vs PureComonent Example</h1>
//                 <h2>This is Parent Component</h2>
//                 <h3>num = {this.state.num}</h3>
//                 <button onClick={()=>this.increment()}>Increment num</button>
//                 <hr />
//                 <Child/>
//             </>
//         )
//     }
// }
