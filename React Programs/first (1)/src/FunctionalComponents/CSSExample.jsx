import React from 'react'

import "../assets/css/component-css.css"
import mystyle from "../assets/css/component-css.module.css"
export default function CSSExample() {
    return (
        <>
            <div className="main">
                <div className="center">
                    <h1>CSS Example</h1>
                    <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus, perferendis.</h2>
                    <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus, perferendis.</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo saepe repudiandae iusto reprehenderit, amet ipsum, quibusdam necessitatibus fugit facere recusandae odio corporis incidunt! Ut eum, corporis accusamus iste ipsa beatae reiciendis blanditiis, iusto nemo error fugiat explicabo velit earum, totam quas dolores dicta optio dolore animi qui ex mollitia exercitationem non ad? Praesentium pariatur ab neque architecto iure! Totam, eligendi sed? Mollitia quaerat adipisci nulla ad rem perspiciatis ipsum? Suscipit odit sapiente commodi consequatur reprehenderit fuga porro optio nobis? Pariatur illo minima ullam libero tenetur dolor quod corporis, nesciunt quidem deleniti recusandae repudiandae quia repellat debitis officiis rerum error! Voluptates.</p>
                    <p>Repellendus ducimus velit tempore nemo laborum dolores deserunt laboriosam! Accusamus saepe reprehenderit perferendis, nihil tenetur soluta sunt. Corporis ad ex dignissimos saepe voluptatum ipsum iusto unde illo, provident quisquam ipsam porro qui velit ratione laudantium eveniet molestias nesciunt cumque exercitationem ducimus libero eaque odit explicabo. Aliquam libero totam, odit expedita ut iusto corporis incidunt impedit fuga optio eveniet vitae nulla hic dolore fugit! Vero fugiat tempora et quidem rerum dolorem sequi veniam sit, facilis blanditiis corrupti asperiores facere ut laudantium consequuntur ad est ea fugit, officia reiciendis itaque dolores earum repellendus. Minus unde cumque natus velit in nam aspernatur quasi.</p>
                    <p className={mystyle.test}>Eos dignissimos maiores deserunt vel possimus autem ut aut, consequuntur iure aperiam non quae officia culpa tempora enim porro sint voluptatibus illo placeat aliquam ipsa quisquam! Voluptas nemo alias saepe adipisci, minima officia sapiente nihil nam doloremque. Nihil, dolorum necessitatibus veniam alias vel quisquam tempore. Mollitia repellendus eveniet, explicabo amet facilis atque voluptatum ad pariatur quos ex tenetur quae fuga dignissimos ullam ipsam corrupti dolores recusandae voluptate alias quibusdam harum. Modi, ad ex. Doloribus ipsa quo adipisci tenetur asperiores voluptate animi quis at itaque deleniti? Commodi, vitae possimus optio, mollitia accusantium voluptate alias tempore hic, culpa obcaecati ex excepturi dolorem!</p>
                    <p>Velit perferendis, aperiam, quas inventore, rem eaque molestiae expedita excepturi natus quia consequuntur culpa! Numquam facilis dolore dicta iste eius odio ipsam cupiditate magni sunt, asperiores doloribus aspernatur voluptatem a nulla accusantium iure possimus aperiam omnis magnam adipisci id ab qui suscipit veritatis! Asperiores consectetur doloremque id, esse delectus laboriosam animi ad consequatur hic? Ut autem corporis eveniet nam ex culpa nihil magni possimus nisi deserunt, labore beatae quo, deleniti doloremque itaque exercitationem dolor mollitia, qui sit perferendis id? Animi ab, est reprehenderit quasi nulla modi exercitationem illum quae blanditiis ullam quam deserunt. Optio veniam, distinctio possimus officiis doloribus ipsa!</p>
                    <p>In, accusantium suscipit dolores enim cupiditate deleniti repellat asperiores error, temporibus, doloremque odio illo nesciunt voluptatem. Dolorum ullam ipsum hic corporis quidem excepturi omnis, numquam, dolore nemo quibusdam nesciunt natus laudantium explicabo veniam quisquam modi tenetur amet autem consequatur voluptatibus maxime iste et animi. Iure hic perferendis sit animi culpa reiciendis eos, totam cupiditate nulla inventore assumenda veniam. Voluptatem quae voluptatum temporibus ratione blanditiis dicta! Quos accusantium provident, perspiciatis ea laudantium ad vel et ullam vero harum porro mollitia inventore magnam repudiandae tenetur veritatis repellendus facere. Quos, atque, adipisci doloribus minima repellat neque, cupiditate distinctio perspiciatis vitae ullam labore vel.</p>
                </div>
            </div>
        </>
    )
}


// import React from 'react'

// const mystyle = {
//     heading: {
//         backgroundColor: "green",
//         color: "white",
//         padding: 10,
//         textAlign: "center"
//     },
//     para: {
//         backgroundColor: "black",
//         color: "white",
//         padding: 10,
//         textAlign: "justify"
//     },
//     red: {
//         backgroundColor: "red"
//     },
//     magenta: {
//         backgroundColor: "magenta"
//     },
//     purple: {
//         backgroundColor: "purple"
//     }
// }
// export default function CSSExample() {
//     return (
//         <>
//             <div className="main">
//                 <div className="center">
//                     <h1 style={{
//                         backgroundColor: "navy",
//                         color: "white",
//                         padding: 10,
//                         textAlign: "center"
//                     }}>CSS Example</h1>
//                     <h2 style={mystyle.heading}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus, perferendis.</h2>
//                     <h2 style={{...mystyle.heading,...mystyle.magenta}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus, perferendis.</h2>
//                     <p style={mystyle.para}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo saepe repudiandae iusto reprehenderit, amet ipsum, quibusdam necessitatibus fugit facere recusandae odio corporis incidunt! Ut eum, corporis accusamus iste ipsa beatae reiciendis blanditiis, iusto nemo error fugiat explicabo velit earum, totam quas dolores dicta optio dolore animi qui ex mollitia exercitationem non ad? Praesentium pariatur ab neque architecto iure! Totam, eligendi sed? Mollitia quaerat adipisci nulla ad rem perspiciatis ipsum? Suscipit odit sapiente commodi consequatur reprehenderit fuga porro optio nobis? Pariatur illo minima ullam libero tenetur dolor quod corporis, nesciunt quidem deleniti recusandae repudiandae quia repellat debitis officiis rerum error! Voluptates.</p>
//                     <p style={mystyle.para}>Repellendus ducimus velit tempore nemo laborum dolores deserunt laboriosam! Accusamus saepe reprehenderit perferendis, nihil tenetur soluta sunt. Corporis ad ex dignissimos saepe voluptatum ipsum iusto unde illo, provident quisquam ipsam porro qui velit ratione laudantium eveniet molestias nesciunt cumque exercitationem ducimus libero eaque odit explicabo. Aliquam libero totam, odit expedita ut iusto corporis incidunt impedit fuga optio eveniet vitae nulla hic dolore fugit! Vero fugiat tempora et quidem rerum dolorem sequi veniam sit, facilis blanditiis corrupti asperiores facere ut laudantium consequuntur ad est ea fugit, officia reiciendis itaque dolores earum repellendus. Minus unde cumque natus velit in nam aspernatur quasi.</p>
//                     <p style={{...mystyle.para,...mystyle.red}}>Eos dignissimos maiores deserunt vel possimus autem ut aut, consequuntur iure aperiam non quae officia culpa tempora enim porro sint voluptatibus illo placeat aliquam ipsa quisquam! Voluptas nemo alias saepe adipisci, minima officia sapiente nihil nam doloremque. Nihil, dolorum necessitatibus veniam alias vel quisquam tempore. Mollitia repellendus eveniet, explicabo amet facilis atque voluptatum ad pariatur quos ex tenetur quae fuga dignissimos ullam ipsam corrupti dolores recusandae voluptate alias quibusdam harum. Modi, ad ex. Doloribus ipsa quo adipisci tenetur asperiores voluptate animi quis at itaque deleniti? Commodi, vitae possimus optio, mollitia accusantium voluptate alias tempore hic, culpa obcaecati ex excepturi dolorem!</p>
//                     <p style={{...mystyle.para,...mystyle.magenta}}>Velit perferendis, aperiam, quas inventore, rem eaque molestiae expedita excepturi natus quia consequuntur culpa! Numquam facilis dolore dicta iste eius odio ipsam cupiditate magni sunt, asperiores doloribus aspernatur voluptatem a nulla accusantium iure possimus aperiam omnis magnam adipisci id ab qui suscipit veritatis! Asperiores consectetur doloremque id, esse delectus laboriosam animi ad consequatur hic? Ut autem corporis eveniet nam ex culpa nihil magni possimus nisi deserunt, labore beatae quo, deleniti doloremque itaque exercitationem dolor mollitia, qui sit perferendis id? Animi ab, est reprehenderit quasi nulla modi exercitationem illum quae blanditiis ullam quam deserunt. Optio veniam, distinctio possimus officiis doloribus ipsa!</p>
//                     <p style={{...mystyle.para,...mystyle.purple}}>In, accusantium suscipit dolores enim cupiditate deleniti repellat asperiores error, temporibus, doloremque odio illo nesciunt voluptatem. Dolorum ullam ipsum hic corporis quidem excepturi omnis, numquam, dolore nemo quibusdam nesciunt natus laudantium explicabo veniam quisquam modi tenetur amet autem consequatur voluptatibus maxime iste et animi. Iure hic perferendis sit animi culpa reiciendis eos, totam cupiditate nulla inventore assumenda veniam. Voluptatem quae voluptatum temporibus ratione blanditiis dicta! Quos accusantium provident, perspiciatis ea laudantium ad vel et ullam vero harum porro mollitia inventore magnam repudiandae tenetur veritatis repellendus facere. Quos, atque, adipisci doloribus minima repellat neque, cupiditate distinctio perspiciatis vitae ullam labore vel.</p>
//                 </div>
//             </div>
//         </>
//     )
// }
