import {NavLink} from 'react-router-dom';
import '../styles/NavBar.css'
import '../assets/main.otf'

function NavBar(){
    return (
        <>
        <div className='NavBar'>
            
            <div className='Left'>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/finder">Finder</NavLink>
            </div>
        </div>
    </>
    )
}

export default NavBar;