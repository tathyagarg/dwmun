import logo from '../assets/logo.webp'
import Contact from '../components/contact'
import '../styles/secretariat.css'

export default function Secretariat() {
    window.scroll(0, 0)
    return <div>
        <div className="secretariat">
            <h1 className="header">Secretariat</h1>
            <div className='oc'>
                <div className='oc-card'>
                    <h1>Logistics Head</h1>
                    <div className='image-placeholder-2'></div>
                    <p>Dhushyanth Gowda & Adhvik G Vijai</p>
                </div>
                <div className='oc-card'>
                    <h1>Head of Design</h1>
                    <div className='image-placeholder-2'></div>
                    <p>Devina Jha</p>
                </div>
                <div className='oc-card'>
                    <h1>Head of Tech</h1>
                    <div className='image-placeholder-2'></div>
                    <p>Tathya Garg</p>
                </div>
                <div className='oc-card'>
                    <h1>Head of Delegate Affairs</h1>
                    <div className='image-placeholder-2'></div>
                    <p>Jagath Singh Raja</p>
                </div>
            </div>
            <div className='image-placeholder'></div>
        </div>
        <Contact></Contact>
    </div>
}