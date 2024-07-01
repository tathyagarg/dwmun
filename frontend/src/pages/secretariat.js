import logo from '../assets/logo.webp'
import Contact from '../components/contact'
import '../styles/secretariat.css'

export default function Secretariat() {
    window.scroll(0, 0)
    return <div>
        <div className="secretariat">
            <h1 className="header">Secretariat</h1>
            <div className='oc'>
                <div className='double-oc-card'>
                    <h1>Co-Heads of OC</h1>
                    <div className='double-oc-information'>
                        <div>
                            <div className='image-placeholder-2'></div>
                            <p>Aarav Chandwaney</p>
                        </div>
                        <div>
                            <div className='image-placeholder-2'></div>
                            <p>Shivam Chatterjee</p>
                        </div>
                    </div>
                </div>
                <div className='double-oc-card'>
                    <h1>Co-Heads of Logistics</h1>
                    <div className='double-oc-information'>
                        <div>
                            <div className='image-placeholder-2'></div>
                            <p>Dhushyanth Gowda</p>
                        </div>
                        <div>
                            <div className='image-placeholder-2'></div>
                            <p>Adhvik G Vijai</p>
                        </div>
                    </div>
                </div>
                <div className='double-oc-card'>
                    <h1>Co-Heads of Social Media</h1>
                    <div className='double-oc-information'>
                        <div>
                            <div className='image-placeholder-2'></div>
                            <p>Catherine Joseph</p>
                        </div>
                        <div>
                            <div className='image-placeholder-2'></div>
                            <p>Tanisha Saklani</p>
                        </div>
                    </div>
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
            {/* <div className='image-placeholder'></div> */}
        </div>
        <Contact></Contact>
    </div>
}