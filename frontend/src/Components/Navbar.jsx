import {Link} from "react-router-dom"
import { useState } from "react"
import{ AiOutlineMenu} from "react-icons/ai"
const Navbar = ()=>{
    const[toggle,setToggle] = useState(true)
    const handleClick = ()=>{
       setToggle(!toggle)
    // alert("Hey")
    }
 return (
<>
<nav className="navbar">
    <div className="logo"><div className="img"><img src="./IMAGES/Logo.jpeg"/></div><div className="text"><h2>KENIFRAZE KINGS COLLEGE</h2></div></div>

    <ul className={toggle ? "nav-links" : "heighter"}>
        <li><Link to="/">Home</Link></li> 
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/academics">Academics</Link></li>
                <li><Link to="/about">About</Link></li>
        {/* <li><a href="/">Contact</Link></li> */}
    </ul>
    <div>   
         <Link to="/donation"> <button className={toggle ? "donate" : "hide"}>Donation</button></Link>
    </div>
    <div className="menu">
        <AiOutlineMenu size={"30px"} className="burger"  onClick={handleClick}/>
    </div>
</nav>
</>
 )   
}


export default Navbar