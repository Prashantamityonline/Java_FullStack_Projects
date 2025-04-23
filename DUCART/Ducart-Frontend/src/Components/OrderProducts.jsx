import React from 'react'
import { Link } from 'react-router-dom'

export default function OrderProducts(props) {
    return (
        <div className="table-responsive">
            <table className='table table-bordered table-striped table-hover'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.data?.map((item) => {
                            return <tr key={item.id}>
                                <td>
                                    <Link to={`${process.env.REACT_APP_SERVER}${item.pic}`} target='_blank' rel='noreferrer'>
                                        <img src={`${process.env.REACT_APP_SERVER}${item.pic}`} height={50} width={50} className='rounded' alt="Product Image" />
                                    </Link>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.brand}</td>
                                <td>{item.color}</td>
                                <td>{item.size}</td>
                                <td>&#8377;{item.price}</td>
                                <td>{item.qty}</td>
                                <td>&#8377;{item.total}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
