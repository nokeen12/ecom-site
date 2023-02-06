import {Link} from 'react-router-dom'
import axios from "axios";
import { useState, useEffect } from 'react';
import "../../css/Productlist.css"

const API_URL = process.env.REACT_APP_API_URL;


function ProductList(){
    const [products, setProducts] = useState([]);

    const getAllProducts = () => {
        axios.get(`${API_URL}/api/products`)
        .then(response=> setProducts(response.data))
        .catch(err=>console.log(err));
    }

    //only grabs all products once
    useEffect(()=>{
        getAllProducts();
    }, []);


    return(
        <div className="Homepage">
            <h1>List of Products</h1>
            <div className="homeproducts">
                {products.map(product=>{
                    return(
                        <div className="ProductCard card" key={product._id}>
                            <Link to={`/products/${product._id}`} className="link-card">
                                <div className="pictures">
                                    <div className="imgContainer">
                                        <img src={product.gallery[3]} className="mainPic" alt="jewelry"/>
                                    </div>
                                    <div className="galleryPics">

                                    </div>
                                </div>
                                <div className="description">
                                    <p style={{"textAlign": "left", "width": "70%"}}>{product.title}</p>
                                    <p style={{"textAlign": "left", "fontWeight": "300"}}>${product.price}</p>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default ProductList;