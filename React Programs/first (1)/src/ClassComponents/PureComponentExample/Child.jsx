import React, { Component } from 'react'

export default class Child extends Component {
    shouldComponentUpdate(nextProps) {
        // console.log(this.props,nextProps)
        return this.props.num1 !== nextProps.num1
    }
    render() {
        console.log("Child Component is Rendered")
        return (
            <>
                <h2>This is Child Component</h2>
                <h3>num1 = {this.props.num1} | num2 = {this.props.num2}</h3>
            </>
        )
    }
}


// import React, { PureComponent } from 'react'

// export default class Child extends PureComponent {
//     render() {
//         console.log("Child Component is Rendered")
//         return (
//             <>
//                 <h2>This is Child Component</h2>
//             </>
//         )
//     }
// }


// import React, { Component } from 'react'

// export default class Child extends Component {
//     shouldComponentUpdate() {
//         return false
//     }
//     render() {
//         console.log("Child Component is Rendered")
//         return (
//             <>
//                 <h2>This is Child Component</h2>
//             </>
//         )
//     }
// }
