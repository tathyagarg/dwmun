import logo from '../../assets/logo.webp';

function IPC() {
    window.scroll(0, 0);
    return <div className="comm-content">
        <h1 className="comm-header">
            IPC
        </h1>
        <p className="agenda">Lorem ipsum</p>
        <p><b>The IPC</b> represents a diverse network of journalists and media professionals from around the world, covering global events, politics, culture, and more. They serve as the eyes and ears of the public, providing crucial insights and information on international affairs. Through their reporting, they facilitate understanding and communication between nations, holding governments and institutions accountable while fostering transparency and dialogue. Often working under challenging conditions, the international press corps plays a vital role in promoting freedom of speech, democracy, and the exchange of ideas on a global scale, shaping public opinion and influencing policy decisions.</p>
        <div className="items">
            <div>
                <a>Country Matrix</a>
            </div>
            <div>
                <a>Background Guide</a>
            </div>
        </div>
        <div className="eb">
            <div>
                <img src={logo} className='eb-photo'></img>
                <div>
                    <h1>EB Name</h1>
                    <p>Lorem ipsum</p>
                </div>
            </div>
            <div>
                <div>
                    <h1>EB Name</h1>
                    <p>Lorem ipsum</p>
                </div>
                <img src={logo} className='eb-photo'></img>
            </div>
            <div>
                <img src={logo} className='eb-photo'></img>
                <div>
                    <h1>EB Name</h1>
                    <p>Lorem ipsum</p>
                </div>
            </div>
        </div>
    </div>

}

export default IPC;