import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
    const [toggle, setToggle] = useState(true);

    const handleClick = () => {
        setToggle(!toggle);
    };

    return (
    <header>

            <nav className="navbar">
            <Link to="/" style={{ textDecoration: 'none' }}>
                <div className="logo">
                    <div className="img">
                        <img src="./IMAGES/Logo.jpeg" alt="Kenifraze Kings College Logo" />
                    </div>
                    <div className="text">
                        <h2>KENIFRAZE KINGS COLLEGE</h2>
                    </div>
                </div>
            </Link>

            <ul className={toggle ? "nav-links" : "heighter"}>
                <li><Link to="/" onClick={() => setToggle(true)}>Home</Link></li> 
                <li><Link to="/events" onClick={() => setToggle(true)}>Events</Link></li>
                <li><Link to="/academics" onClick={() => setToggle(true)}>Academics</Link></li>
                <li><Link to="/about" onClick={() => setToggle(true)}>About</Link></li>
                <li className='hider'><Link to="/donation" onClick={() => setToggle(true)}>Donation</Link></li>
            </ul>


            <div>   
                <Link to="/donation">
                    <button className={toggle ? "donate" : "hide"}>Donation</button>
                </Link>
            </div>
            <div className="menu">
                <AiOutlineMenu size={"30px"} className="burger" onClick={handleClick} />
            </div>
        </nav>
    </header>
    );
};

export default Navbar;