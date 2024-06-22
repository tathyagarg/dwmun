import { Link } from 'react-router-dom'
import '../styles/navbar.css'
import styled from "styled-components";
import rotary from '../assets/rotary.png'

const NavLink = styled(Link)`
    color: #fff;
    text-decoration: none;

    transition-duration: 250ms;

    &:hover, &:focus {
        color: #a0a0a0;
        transition-duration: 250ms;
    }
`

const scrollToTop = () => {
    window.scroll(0, 0)
}

export default function Navbar() {
    return <nav className='topnav' id="topnav">
        <NavLink to="/dwmun" onClick={scrollToTop}>Home</NavLink>
        <NavLink to="/committees" onClick={scrollToTop}>Committees</NavLink>
        <NavLink to="/secretariat" onClick={scrollToTop}>Secretariat</NavLink>
        <NavLink to="/registration" onClick={scrollToTop}>Registration</NavLink>
        <NavLink to="/resources" onClick={scrollToTop}>Rsources</NavLink>
        {/* <div className='logo'>
            <a href="https://rcb1934.in">
                <img src={rotary}></img>
            </a>
        </div> */}
    </nav>
}