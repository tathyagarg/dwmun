import { Link } from 'react-router-dom'
import '../styles/navbar.css'
import styled from "styled-components";

const NavLink = styled(Link)`
    color: var(--contrast-secondary);
    text-decoration: none;

    transition-duration: 250ms;

    &:hover {
        color: var(--contrast-secondary-alternate);
        transition-duration: 250ms;
    }
`

function Navbar() {
    return <nav className='parent'>
        <div className='logo'></div>
        <NavLink to="/dwmun">Home</NavLink>
        <NavLink to="/committees">Committees</NavLink>
    </nav>
}

export default Navbar