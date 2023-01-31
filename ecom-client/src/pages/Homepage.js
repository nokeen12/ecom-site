import {Link} from 'react-router-dom'
import axios from "axios";
import { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL;


function HomePage(){
    const [products, setProducts] = useState([]);

    const getAllProducts = () => {
        setTimeout(()=>{
        axios.get(`${API_URL}/api/products`)
        .then(response=> setProducts(response.data))
        .catch(err=>console.log(err))}, 300)
    }

    //only grabs all products once
    useEffect(()=>{
        getAllProducts();
    }, []);

    return(
        <div className="Homepage">
            {/* <h1 id="title">Home</h1> */}
            <Link to="/products" style={{"textDecoration": "underline"}}>All Products</Link>
            <div className="homeproducts">
                {products && products.filter((item, index) => index < 4).map(product=>{
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
export default HomePage;