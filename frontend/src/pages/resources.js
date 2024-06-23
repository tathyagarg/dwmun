import '../styles/resources.css'
import Contact from '../components/contact.js'

export default function Resources() {
    return (<div>
        <div className="delegate-resources-container">
            <h1 className="header">Delegate Resources</h1>
            <div className='resources-parent'>
                <h1 className='subhead'>Committee Information</h1>
                <div className='resources'>
                    <div>
                        <h1>Committee X</h1>
                        <a>Matrix</a>
                        <a>Background Guide</a>
                    </div>
                    <div>
                        <h1>CCC</h1>
                        <a>Matrix</a>
                        <a>Background Guide</a>
                    </div>
                    <div>
                        <h1>DISEC</h1>
                        <a>Matrix</a>
                        <a>Background Guide</a>
                    </div>
                    <div>
                        <h1>IPC</h1>
                        <a>Matrix</a>
                        <a>Background Guide</a>
                    </div>
                    <div>
                        <h1>Lok Sabha</h1>
                        <a>Matrix</a>
                        <a>Background Guide</a>
                    </div>
                    <div>
                        <h1>UNHRC</h1>
                        <a>Matrix</a>
                        <a>Background Guide</a>
                    </div>
                    <div>
                        <h1>UNSC</h1>
                        <a>Matrix</a>
                        <a>Background Guide</a>
                    </div>
                </div>
            </div>
        </div>
        <Contact></Contact>
    </div>)
}