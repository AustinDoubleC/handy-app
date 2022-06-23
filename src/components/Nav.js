import React from "react"
import {Link} from "react-router-dom"

const Nav = ()=>{
    return(
        <nav>
            <ul>
                
                <Link className="nav-link" to="/handy-app/weather"><li><i className="fa-solid fa-temperature-full"></i></li></Link>
                <Link className="nav-link" to="/handy-app/"><li><i className="fa-solid fa-house"></i></li></Link>
                <Link className="nav-link" to="/handy-app/note"><li><i className="fa-regular fa-note-sticky"></i></li></Link>
            </ul>
        </nav>
    )
}

export default Nav 