import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Profile(){
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    
    return(
        <div>
            <h1>Profile Page</h1>
            {isLoggedIn && (
                <>
                    <h3>Username: {user.username}</h3>
                    <h3>Email: {user.email}</h3>
                    <Link to={`/profile/edit/:${user._id}`}><h3>Edit Profile</h3></Link>
                </>
            )}
            {!isLoggedIn && (
                <>
                    <h3>You are not logged in.</h3>
                    <Link to="/signup"><h3>Sign Up</h3></Link>
                    <Link to="/login"><h3>Log In</h3></Link>
                </>
            )}
        </div>
    )
}
export default Profile;