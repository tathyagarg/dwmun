import Contact from '../components/contact'
import '../styles/secretariat.css'
import DirectorGeneral from '../assets/secretariat/director-general.jpeg'
import DelegateAffiars from '../assets/secretariat/head-of-delegate-affairs.jpeg'
import OC1 from '../assets/secretariat/head-of-oc-1.jpeg'
import OC2 from '../assets/secretariat/head-of-oc-2.jpeg'
import Logistics1 from '../assets/secretariat/head-of-logistics-1.jpeg'
import Logistics2 from '../assets/secretariat/head-of-logistics-2.jpeg'

export default function Secretariat() {
    return <div>
        <div className="secretariat">
            <h1 className="header">Secretariat</h1>
            <div className='oc'>
                <div className='oc-card'>
                    <h1>Director General</h1>
                    <img className='image-placeholder-2' src={DirectorGeneral}></img>
                    <p>Chirantana Hegde</p>
                </div>
                <div className='double-oc-card'>
                    <h1>Co-Heads of OC</h1>
                    <div className='double-oc-information'>
                        <div>
                        <img className='image-placeholder-2' src={OC1}></img>
                            <p>Aarav Chandwaney</p>
                        </div>
                        <div>
                            <img className='image-placeholder-2' src={OC2}></img>
                            <p>Shivam Chatterjee</p>
                        </div>
                    </div>
                </div>
                <div className='double-oc-card'>
                    <h1>Co-Heads of Logistics</h1>
                    <div className='double-oc-information'>
                        <div>
                            <img className='image-placeholder-2' src={Logistics1}></img>
                            <p>Dhushyanth Gowda</p>
                        </div>
                        <div>
                            <img className='image-placeholder-2' src={Logistics2}></img>
                            <p>Adhvik G Vijai</p>
                        </div>
                    </div>
                </div>
                <div className='oc-card'>
                    <h1>Head of Delegate Affairs</h1>
                    <img className='image-placeholder-2' src={DelegateAffiars}></img>
                    <p>Jagath Singh Raja</p>
                </div>
            </div>
            {/* <div className='image-placeholder'></div> */}
        </div>
        <Contact></Contact>
    </div>
}