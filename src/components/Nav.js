import React from "react"
import {Link} from "react-router-dom"

const Nav = ()=>{
    return(
        <nav>
            <ul>
                
                <Link className="nav-link" to="/weather"><li><i className="fa-solid fa-temperature-full"></i></li></Link>
                <Link className="nav-link" to="/"><li><i className="fa-solid fa-house"></i></li></Link>
                <Link className="nav-link" to="/note"><li><i className="fa-regular fa-note-sticky"></i></li></Link>
            </ul>
        </nav>
    )
}

export default Nav 