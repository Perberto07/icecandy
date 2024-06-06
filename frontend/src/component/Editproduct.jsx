import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import './css/editproduct.css';
import './css/topback.css';

function Editproduct() {
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [editingProductData, setEditingProductData] = useState({
        ProductFlavor: '',
        Price: ''
    });
    const [searchInput, setSearchInput] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const contentRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:8080/product')
            .then(res => {
                setProducts(res.data);
                setFilteredProducts(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    const handleEditClick = (product) => {
        setEditingProductId(product.ProductNO);
        setEditingProductData({
            ProductFlavor: product.ProductFlavor,
            Price: product.Price
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingProductData({ ...editingProductData, [name]: value });
    };

    const handleUpdateClick = (productId) => {
        const confirmUpdate = window.confirm("Are you sure you want to apply changes?");
        if (confirmUpdate) {
            axios.put(`http://localhost:8080/product/${productId}`, editingProductData)
                .then(() => {
                    setProducts(products.map(product =>
                        product.ProductNO === productId ? { ...product, ...editingProductData } : product
                    ));
                    setFilteredProducts(filteredProducts.map(product =>
                        product.ProductNO === productId ? { ...product, ...editingProductData } : product
                    ));
                    setEditingProductId(null);
                })
                .catch(err => console.error(err));
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
        const filtered = products.filter(product =>
            product.ProductFlavor.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const scrollToTop = () => {
        if (contentRef.current) {
            contentRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <div className='Content' ref={contentRef}>
                <Sidebar />
                <div className='edit-product-container'>
                    <h2 className='edit-product-heading'>Edit Product</h2>


                    <input
                        type="text"
                        placeholder="Search by Product Flavor"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                    />
                    <table className='edit-product-table'>
                        <thead>
                            <tr>
                                <th>Product NO.</th>
                                <th>Product Flavor</th>
                                <th>Price</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product, index) => (
                                <tr key={index}>
                                    {editingProductId === product.ProductNO ? (
                                        <>
                                            <td>{product.ProductNO}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="ProductFlavor"
                                                    value={editingProductData.ProductFlavor}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        if (/^[a-zA-Z\s]*$/.test(inputValue)) {
                                                            handleInputChange(e);
                                                        }
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="Price"
                                                    value={editingProductData.Price}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <button className="product-list-button" onClick={() => handleUpdateClick(product.ProductNO)}>Update</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{product.ProductNO}</td>
                                            <td>{product.ProductFlavor}</td>
                                            <td>{product.Price}</td>
                                            <td>
                                                <button className="product-list-button" onClick={() => handleEditClick(product)}><i className="fa fa-edit"></i> | Edit</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>


                </div>
                <button onClick={scrollToTop} className='back-to-top'>
                    Back to Top
                </button>
            </div>
        </>
    );
}

export default Editproduct;
