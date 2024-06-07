import indi from '../assets/registration/indi.png'
import group from '../assets/registration/group.png'
import Contact from '../components/contact'
import '../styles/registration.css'

function Registration() {
    return <div>
        <div className='registration-content'>
            <h1 className="registration-header">Registration</h1>
            <div className='registration-options'>
                <a>
                    <div className='option'>
                        <img src={indi} height={"75%"}></img>
                        <p>Individual Registration</p>
                    </div>
                </a>
                <a>
                    <div className='option'>
                        <img src={group} height={"75%"}></img>
                        <p>Delegation Registration</p>
                    </div>
                </a>
            </div>
        </div>
        <Contact></Contact>
    </div>
}

export default Registration;