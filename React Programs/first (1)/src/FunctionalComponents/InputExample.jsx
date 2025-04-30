import React, { useState } from 'react'

export default function InputExample() {
    let [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        designation: "",
        salary: "",
        city: "",
        state: "",
    })

    function getInputData(e) {
        let { name, value } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    function postSubmit(e) {
        e.preventDefault()
        alert(`
                Name            :   ${data.name}
                Email           :   ${data.email}
                Phone           :   ${data.phone}
                Designation     :   ${data.designation}
                Salary          :   ${data.salary}
                City            :   ${data.city}
                State           :   ${data.state}
            `)
    }
    return (
        <>
            <div className="main">
                <div className="center">
                    <h1>Functional Component Input Example</h1>
                    <h2>Name  : {data.name}</h2>
                    <h2>Email  : {data.email}</h2>
                    <h2>Phone  : {data.phone}</h2>
                    <h2>Designation  : {data.designation}</h2>
                    <h2>Salary  : {data.salary}</h2>
                    <h2>City  : {data.city}</h2>
                    <h2>State  : {data.state}</h2>
                    <form onSubmit={postSubmit}>
                        <input type="text" name="name" required onChange={getInputData} placeholder='Full Name' />
                        <input type="email" name="email" required onChange={getInputData} placeholder='Email Address' />
                        <input type="text" name="phone" required onChange={getInputData} placeholder='Phone Number' />
                        <input type="text" name="designation" required onChange={getInputData} placeholder='Designation' />
                        <input type="text" name="salary" required onChange={getInputData} placeholder='Salary' />
                        <input type="text" name="city" required onChange={getInputData} placeholder='City Name' />
                        <input type="text" name="state" required onChange={getInputData} placeholder='State Name' />
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}



// import React, { useState } from 'react'

// export default function InputExample() {
//     let [name, setName] = useState("")
//     let [email, setEmail] = useState("")
//     let [phone, setPhone] = useState("")
//     let [designation, setDesignation] = useState("")
//     let [salary, setSalary] = useState("")
//     let [city, setCity] = useState("")
//     let [state, setState] = useState("")

//     function postSubmit() {
//         alert(`
//                 Name            :   ${name}
//                 Email           :   ${email}
//                 Phone           :   ${phone}
//                 Designation     :   ${designation}
//                 Salary          :   ${salary}
//                 City            :   ${city}
//                 State           :   ${state}
//             `)
//     }
//     return (
//         <>
//             <div className="main">
//                 <div className="center">
//                     <h1>Functional Component Input Example</h1>
//                     <h2>Name  : {name}</h2>
//                     <h2>Email  : {email}</h2>
//                     <h2>Phone  : {phone}</h2>
//                     <h2>Designation  : {designation}</h2>
//                     <h2>Salary  : {salary}</h2>
//                     <h2>City  : {city}</h2>
//                     <h2>State  : {state}</h2>
//                     <input type="text" name="name" onChange={(e) => setName(e.target.value)} placeholder='Full Name' />
//                     <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' />
//                     <input type="text" name="phone" onChange={(e) => setPhone(e.target.value)} placeholder='Phone Number' />
//                     <input type="text" name="designation" onChange={(e) => setDesignation(e.target.value)} placeholder='Designation' />
//                     <input type="text" name="salary" onChange={(e) => setSalary(e.target.value)} placeholder='Salary' />
//                     <input type="text" name="city" onChange={(e) => setCity(e.target.value)} placeholder='City Name' />
//                     <input type="text" name="state" onChange={(e) => setState(e.target.value)} placeholder='State Name' />
//                     <button onClick={postSubmit}>Submit</button>
//                 </div>
//             </div>
//         </>
//     )
// }





// import React, { useState } from 'react'

// export default function InputExample() {
//     let [name, setName] = useState("")

//     function getInputData(e) {
//         setName(e.target.value)
//     }
//     function postSubmit() {
//         alert(`Hello ${name}`)
//     }
//     return (
//         <>
//             <div className="main">
//                 <div className="center">
//                     <h1>Functional Component Input Example</h1>
//                     <h2>Name  : {name}</h2>
//                     {/* <input type="text" name="name" onChange={(e)=>getInputData(e)} placeholder='Full Name' /> */}
//                     {/* <button onClick={()=>postSubmit()}>Submit</button> */}
//                     <input type="text" name="name" onChange={getInputData} placeholder='Full Name' />
//                     <button onClick={postSubmit}>Submit</button>
//                 </div>
//             </div>
//         </>
//     )
// }
