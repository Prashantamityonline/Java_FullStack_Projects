import React from "react"
import ReactDOM from "react-dom/client"
import "./assets/css/global.css"

import UseRefExample from "./FunctionalComponents/HooksExample/UseRefExample"
// import Parent from "./FunctionalComponents/HooksExample/UseCallbackExample/Parent"
// import UseMemoExample from "./FunctionalComponents/HooksExample/UseMemoExample"
// import UseEffectExample from "./FunctionalComponents/HooksExample/UseEffectExample"
// import StateExample from "./ClassComponents/StateExample"
// import StateExampleF from "./FunctionalComponents/StateExampleF"
// import Parent from "./ClassComponents/SendingDataPC/Parent"
// import Parent from "./FunctionalComponents/SendDataPC/Parent"
// import Parent from "./ClassComponents/SendingDataCP/Parent"
// import Parent from "./FunctionalComponents/SendDataCP/Parent"
// import ImageExample from "./FunctionalComponents/ImageExample"
// import CSSExample from "./FunctionalComponents/CSSExample"
// import InputExample from "./ClassComponents/InputExample"
// import InputExample from "./FunctionalComponents/InputExample"
// import BootstrapExample from "./FunctionalComponents/BootstrapExample"
// import MaterialUIExample from "./FunctionalComponents/MaterialUIExample"
// import App from "./FunctionalComponents/RoutingExample/App"
// import Parent from "./ClassComponents/PureComponentExample/Parent"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <>
        {/* <Parent /> */}
        {/* <StateExample/>
        <hr/>
        <StateExampleF/> */}
        {/* <ImageExample/> */}
        {/* <CSSExample/> */}
        {/* <InputExample/> */}
        {/* <BootstrapExample/> */}
        {/* <MaterialUIExample/> */}
        {/* <App/> */}
        {/* <Parent/> */}
        {/* <UseEffectExample/> */}
        {/* <UseMemoExample/> */}
        {/* <Parent/> */}
        <UseRefExample />
    </>
)


// import React from "react"
// import ReactDOM from "react-dom/client"
// import ArrayOfObjectsExample from "./ClassComponents/ArrayOfObjectsExample"
// import ArrayOfObjectsF from "./FunctionalComponents/ArrayOfObjectsF"

// const root = ReactDOM.createRoot(document.getElementById("root"))

// root.render(
//     <>
//         <ArrayOfObjectsExample />
//         <hr />
//         <ArrayOfObjectsF />
//     </>
// )

// import React from "react"
// import ReactDOM from "react-dom/client"

// // import ExportImportExample, { arr, display, name, emp } from "./ClassComponents/ExportImportExample"
// import ExportImportExample, { arr, display, name, emp } from "./FunctionalComponents/ExportImportExample"

// const root = ReactDOM.createRoot(document.getElementById("root"))

// root.render(
//     <>
//         <ExportImportExample />
//         <h2>Name : {name}</h2>
//         <h2>Array : {arr.join(" ")}</h2>
//         <h2>Employee Id : {emp.id}</h2>
//         <h2>Employee Name : {emp.name}</h2>
//         <h2>Employee Designation : {emp.dsg}</h2>
//         <h2>Employee Salary : {emp.salary}</h2>
//         <h2>Employee City : {emp.city}</h2>
//         <h2>Employee State : {emp.state}</h2>
//         {display()}
//     </>
// )


// import React from "react"
// import ReactDOM from "react-dom/client"

// import * as Data from "./ClassComponents/ExportImportExample"

// const root = ReactDOM.createRoot(document.getElementById("root"))

// root.render(
//     <>
//         <Data.default />
//         <h2>Name : {Data.name}</h2>
//         <h2>Array : {Data.arr.join(" ")}</h2>
//         <h2>Employee Id : {Data.emp.id}</h2>
//         <h2>Employee Name : {Data.emp.name}</h2>
//         <h2>Employee Designation : {Data.emp.dsg}</h2>
//         <h2>Employee Salary : {Data.emp.salary}</h2>
//         <h2>Employee City : {Data.emp.city}</h2>
//         <h2>Employee State : {Data.emp.state}</h2>
//         {Data.display()}
//     </>
// )



// import React from "react"
// import ReactDOM from "react-dom/client"
// import Test from "./ClassComponents/Test"
// import TestF from "./FunctionalComponents/TestF"

// const root = ReactDOM.createRoot(document.getElementById("root"))

// root.render(
//     <>
//         <Test/>
//         <hr/>
//         <TestF/>
//     </>
// )


// root.render(
//     <>
//         <h1>Hello World!!!</h1>
//         <h2>This is First React Program</h2>
//     </>
// )

//Using React.Fragment
// root.render(
//     <React.Fragment>
//         <h1>Hello World!!!</h1>
//         <h2>This is First React Program</h2>
//     </React.Fragment>
// )

//Using Div
// root.render(
//     <div>
//         <h1>Hello World!!!</h1>
//         <h2>This is First React Program</h2>
//     </div>
// )

//Using Array
// root.render(
//     [
//         <h1>Hello World!!!</h1>,
//         <h2>This is First React Program</h2>
//     ]
// )

// root.render(
//     <h1>Hello World!!!</h1>
// )