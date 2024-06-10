import logo from '../../assets/logo.webp';

function SSCI() {
    window.scroll(0, 0);
    return <div className="comm-content">
        <h1 className="comm-header">
            SSCI
        </h1>
        <p className="agenda">Lorem ipsum</p>
        <p><b>The Senate Select Committee on Intelligence</b> is a bipartisan committee of the United States Senate established in 1976. Its primary role is to oversee and monitor the activities of the U.S. intelligence community, which includes agencies like the CIA, NSA, and FBI. The SSCI ensures these agencies operate within the law and adhere to American values, balancing national security needs with civil liberties. The committee conducts investigations, reviews intelligence operations, and provides legislative oversight, making recommendations to improve intelligence gathering and national security measures while maintaining transparency and accountability.</p>
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

export default SSCI;