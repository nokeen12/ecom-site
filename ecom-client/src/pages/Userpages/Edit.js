import { useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function Edit(){
    const { user, logOutUser } = useContext(AuthContext);

    const [email, setEmail] = useState(user.email);
    // const [password, setPassword] = useState('');
    const cart = user.cart;
    const [username, setUsername] = useState(user.username);
    const [errorMessage, setErrorMessage] = useState(undefined);
    
    const navigate = useNavigate();
    
    const handleEmail = (e) => setEmail(e.target.value);
    // const handlePassword = (e) => setPassword(e.target.value);
    const handleUsername = (e) => setUsername(e.target.value);
    


    const handleEditSubmit = (e) => {
        e.preventDefault();
        const requestBody = { email, cart, username };
        axios.put(`${API_URL}/api/profile/edit/${user._id}`, requestBody)
          .then(response => {
            navigate('/profile');
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          })
    };

    const handleDeleteSubmit = (e) => {
        e.preventDefault();
        axios.delete(`${API_URL}/api/profile/${user._id}`)
          .then(response => {
            logOutUser();
            navigate('/');
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          })
    };

    return(
        <div>
            <h1>Edit Page</h1>
            <form onSubmit={handleEditSubmit}>
            
            <label>Update Username</label>
            <input 
                type="text"
                name="username"
                value={username}
                onChange={handleUsername}
            />

            <label>Update Email</label>
            <input 
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
            />
{/* 
            <label>Update Password</label>
            <input 
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
            /> */}

            <button type="submit">Edit Account</button>
        </form>
        <form onSubmit={handleDeleteSubmit}>
            <button type="submit">Delete Account</button>
        </form>

        { errorMessage && <p className="error-message">{errorMessage}</p> }

        </div>
    )
}
export default Edit;