import React from 'react'
import {Link} from 'react-router-dom';
function Header({home,register,list,tree}) {

    

    
    return (
        <div>
            <h1 className="header">
                Medblocks
            </h1>
            <nav className="nav-bar">
            {home && <Link className="nav-anchor" to={"/"}><button className="nav-btn">Home</button></Link>}
            {register && <Link className="nav-anchor" to={"/register"}><button className="nav-btn">Register</button></Link>}
            {list && <Link className="nav-anchor" to={"/list"}><button className="nav-btn">List</button></Link>}
            {tree && <Link  className="nav-anchor" to={"/tree"}><button className="nav-btn">Tree</button></Link>}
         
            </nav>
        </div>
    )
}

export default Header
