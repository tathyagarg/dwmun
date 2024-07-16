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
                <a href='https://forms.gle/jnqWe3F2i77ryJBC6' target="_blank">
                    <div className='option'>
                        <img src={indi}></img>
                        <p>Individual Registration</p>
                    </div>
                </a>
                <a href="https://forms.gle/m5wJkPLQdeXkM9zPA" target='_blank'>
                    <div className='option'>
                        <img src={group}></img>
                        <p>Delegation Registration</p>
                    </div>
                </a>
            </div>
        </div>
        <Contact></Contact>
    </div>
}