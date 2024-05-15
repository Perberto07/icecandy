import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';




function Productlist() {
    const [Product, setProduct] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/product')
            .then(res => setProduct(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
        <Sidebar/>
        
        <div className='Content'>

                    <div className='col-md-9 bg-dark bg-opacity-100   d-flex justify-content-center align-items-center'>
                        <div className='w-200 h-90 bg-white rounded p-4'>
                            <table className='table'>

                                <thead>
                                    <tr>
                                        <th>Product No.</th>
                                        <th>Product Flavor</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Product.map((Product, index) => (
                                        <tr key={index}>
                                            <td>{Product.ProductNO}</td>
                                            <td>{Product.ProductFlavor}</td>
                                            <td>{Product.Price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                    
            </>

            );
}

            export default Productlist;
