import logo from '../../assets/logo.webp';

function UNSC() {
    window.scroll(0, 0);
    return <div className="comm-content">
        <h1 className="comm-header">
            UNSC
        </h1>
        <p className="agenda">Lorem ipsum</p>
        <p><b>The United Nations Security Council</b> is one of the six principal organs of the United Nations, responsible for maintaining international peace and security. Established in 1945 following World War II, the UNSC has 15 members: five permanent members with veto power, and ten non-permanent members elected for two-year terms by the General Assembly. The council has the authority to determine the existence of a threat to peace or an act of aggression and to take military and non-military action to restore international stability. Its decisions, known as resolutions, are binding on all UN member states, making it a pivotal body in global governance. The UNSC also oversees peacekeeping operations, imposes sanctions, and authorizes the use of force when necessary, playing a critical role in addressing conflicts and crises around the world.</p>
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

export default UNSC;