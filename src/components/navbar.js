import { Link } from 'react-router-dom'
import '../styles/navbar.css'
import styled from "styled-components";

const NavLink = styled(Link)`
    color: #fff;
    text-decoration: none;

    transition-duration: 250ms;

    &:hover, &:focus {
        color: #a0a0a0;
        transition-duration: 250ms;
    }
`

function Navbar() {
    return <nav className='topnav' id="topnav">
        <div className='logo'></div>
        <NavLink to="/dwmun">Home</NavLink>
        <NavLink to="/committees">Committees</NavLink>
        <NavLink to="/secretariat">Secretariat</NavLink>
        <NavLink to="/registration">Registration</NavLink>
    </nav>
}

export default Navbar