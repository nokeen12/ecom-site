import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import "../../css/Productdetails.css";

const API_URL = process.env.REACT_APP_API_URL;

function ProductDetails(){
    const { isLoggedIn, user } = useContext(AuthContext);
    const params = useParams();
    const [product, setProduct] = useState([]);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const productId = params.id
    const navigate = useNavigate();

    function getProduct(){
        axios.get(`${API_URL}/api/products/${params.id}`)
        .then(response=> setProduct(response.data))
        .catch(err=>console.log(err));
    }

    //grabs the product that matches the params
    useEffect(()=>{
        getProduct();
    }, []);

    //need to send this product to the user cart
    const handleAddCartSubmit = (e) => {
        e.preventDefault();
        const requestBody = { userId: user._id, productId};
        axios.post(`${API_URL}/api/cart`, requestBody)
          .then(response => {
            navigate('/cart');
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          })
    };
    
    const htmlText = product.desc
    return(
        <div id="ProductPage">
            <br/>
            <div className="pictures">
                <div className="imgContainer"
                    style={{"width": "80%"}}
                >
                    <img src={product.gallery && product.gallery[3]} className="mainPic" alt="jewelry"/>
                </div>
                <div className="galleryPics">
                </div>
            </div>
            <div className="description">
                <p>{product.title}</p>
                <p style={{"fontWeight": "300"}}>${product.price}</p>
                {isLoggedIn && <form onSubmit={handleAddCartSubmit}><button type='submit'>Add to Cart</button></form>}
                <div className="details" dangerouslySetInnerHTML={{__html: htmlText}}></div>
        </div>

        
        
        { errorMessage && <p className="error-message">{errorMessage}</p> }
        </div>
    )
}
export default ProductDetails;