import logo from '../../assets/logo.webp';

function DISEC() {
    window.scroll(0, 0);
    return <div className="comm-content">
        <h1 className="comm-header">
            DISEC
        </h1>
        <p className="agenda">Lorem ipsum</p>
        <p><b>The Disarmament and International Security Committee</b>, also known as the First Committee of the United Nations General Assembly, is dedicated to addressing global peace and security issues. Established in 1945, DISEC focuses on disarmament, the regulation of armaments, and tackling international security challenges. It promotes global stability by debating and recommending resolutions on reducing the proliferation of weapons, including nuclear, chemical, and biological arms. While its resolutions are not legally binding, they carry significant moral and political influence, fostering dialogue and cooperation among nations to mitigate conflicts and enhance global security.</p>
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

export default DISEC;