import { Link } from 'react-router-dom'
import indi from '../assets/registration/indi.png'
import group from '../assets/registration/group.png'
import Contact from '../components/contact'
import '../styles/registration.css'

const scrollToTop = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

export default function Registration() {
    return <div>
        <div className='registration-content'>
            <h1 className="header">Registration</h1>
            <div className='registration-options'>
                <Link to="/registration/individual" onClick={scrollToTop}>
                    <div className='option'>
                        <img src={indi}></img>
                        <p>Individual Registration</p>
                    </div>
                </Link>
                <Link to="/registration/delegation" onClick={scrollToTop}>
                    <div className='option'>
                        <img src={group}></img>
                        <p>Delegation Registration</p>
                    </div>
                </Link>
            </div>
        </div>
        <Contact></Contact>
    </div>
}