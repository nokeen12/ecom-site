import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import './Navbar.css'
import SilverLogo from "../Logo/SilverLogo";
import { ReactComponent as BurgerIcon } from '../../icons/hamburgermenu.svg'
import { AuthContext } from "../../context/auth.context";

function Navbar(){
    return(
        <nav className='navbar'>
            <div id="logo">
                <NavItem icon={<SilverLogo />} />
            </div>
            <div id='items'>
                <NavItem icon={<BurgerIcon />}>
                    <DropdownMenu />
                </NavItem>
            </div>
        </nav>
    )
}

function NavItem(props){

    const [open, setOpen] = useState(false);

    return(
        <li className="nav-item">
            <div className="icon-button" onClick={() => setOpen(!open)}>
                {props.icon}
            </div>

            {open && props.children}
        </li>
    )
}

function DropdownMenu(){
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    function DropdownItem(props){
        return(
            <div className="menu-item">
                {props.children}
            </div>
        )
    }
    return(
        <div className="dropdown">
            {isLoggedIn && <span>{user && user.username}</span>}
            <DropdownItem><Link to="/">Home</Link></DropdownItem>
            <DropdownItem><Link to="/products">All Products</Link></DropdownItem>
            {isLoggedIn && (
            <>
            <DropdownItem><Link to="/cart">View Cart</Link></DropdownItem>
            <DropdownItem><Link to="/profile">Profile</Link></DropdownItem>
            <DropdownItem><Link to={`/profile/edit/:${user._id}`}>Edit Profile</Link></DropdownItem>
            <DropdownItem><Link to="/" onClick={logOutUser}>Logout</Link></DropdownItem>
            </>
            )}
            {!isLoggedIn && (
            <>
            <DropdownItem><Link to="/signup">Sign up</Link></DropdownItem>
            <DropdownItem><Link to="/login">Log in</Link></DropdownItem>
            </>
            )}
        </div>
    )
}

export default Navbar;