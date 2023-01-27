import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

function Cart(){
    const { user } = useContext(AuthContext);
    const [ cart, setCart ] = useState([]);
    // const [errorMessage, setErrorMessage] = useState(undefined);

    const getUserCart = () => {
        axios.get(`${API_URL}/api/profile/cart/${user._id}`)
        .then(response=> {
            setCart(response.data)
            console.log(response.data)
        })
        .catch(err=>console.log('there was an error: ', err));
    }

    useEffect(()=>{
        getUserCart()
    }, []);

    let handleDeleteItemSubmit = (e) => {
        e.preventDefault();
        let productId = e.target.getAttribute("removeproduct")
        let requestBody = { productId }
        setCart(cart.filter(items=>items.title!==productId))
        axios.put(`${API_URL}/api/profile/cart/${user._id}`, requestBody)
        .catch(err=>console.log('there was an error: ', err));
    };

    let total = 0;
    return(
        <div>
            <h2>This cart belongs to {user && user.username}</h2>
            {cart.map((product, index)=>{
                total += Number(product.price)
                return(
                    <div key={index}>
                        <img src={product.gallery[3]} className="cartPic" alt="jewelry"/>       
                        <p className='title'>{product.title}</p>
                        <p>$<span className='price'>{product.price}</span></p>
                        <button removeproduct={product.title} onClick={handleDeleteItemSubmit}>Delete Item</button>
                    </div>
                )
            })}
            <p>Total is ${Math.round(total*100)/100}</p>
            <Link to='/checkout'><button>Checkout Now</button></Link>
            {/* { errorMessage && <p className="error-message">{errorMessage}</p> } */}

        </div>
    )
}
export default Cart;