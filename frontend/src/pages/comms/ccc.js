import logo from '../../assets/logo.webp';

export default function CCC() {
    window.scroll(0, 0);
    return <div className="comm-content">
        <h1 className="comm-header">
            CCC
        </h1>
        <p className="agenda">Lorem ipsum</p>
        <p><b>A Continuous Crisis Committee</b> is a dynamic simulation model used primarily in Model United Nations (MUN) conferences to emulate the rapid and evolving nature of real-world crises. Unlike traditional committees, the CCC is characterized by its fluid agenda, allowing delegates to respond immediately to unfolding events and unexpected developments. Participants represent various stakeholders, such as countries, organizations, or individuals, and must think critically and act swiftly to address complex issues. The CCC fosters intense debate, strategic negotiation, and quick decision-making, providing a realistic and immersive experience that tests delegates' ability to manage and resolve high-stakes situations under pressure.</p>
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