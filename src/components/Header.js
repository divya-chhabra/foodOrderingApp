import { useState } from "react";
import Logo from "../assets/img/logo.png";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import UserContext from "../utils/UserContext";

// const loggedInUser = ()=>{
//     return true;
// }

const Title = () =>{
    return (
        <div>
            <Link to="/">
            <img className="h-28 p-2" src={Logo} 
                alt="Food Villa Logo" />
            </Link>
        </div>
    )
}

const Header = () => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const {user} = useContext(UserContext);
    return (
        <div className="flex justify-between bg-pink-50 shadow-lg">
            <Title/>
            <div className='nav-items'>
                <ul className="flex py-10">
                    <li className="px-2"><Link to="/">Home</Link></li>
                    <li className="px-2"><Link to="/about">About</Link></li>
                    <li className="px-2"><Link to="/contact">Contact</Link></li>
                    <li className="px-2">Cart</li>
                    <li className="px-2"><Link to="/instamart">Instamart</Link></li>
                </ul>   
            </div>
            <span className="p-10 font-bold text-red-900">{ user.name}</span>
            { 
            
                isLoggedIn?<button onClick={()=>setIsLoggedIn(false)}>Logout</button>:
                           <button onClick={()=>setIsLoggedIn(true)}>Login</button>
                           
            }
            
            
       </div>
    )
}

export default Header;