import logo from '../../assets/logo.webp';

export default function LokSabha() {
    window.scroll(0, 0);
    return <div className="comm-content">
        <h1 className="comm-header">
            Lok Sabha
        </h1>
        <p className="agenda">Lorem ipsum</p>
        <p><b>The Lok Sabha</b>, the lower house of India's Parliament, is the cornerstone of the country's democratic system. Comprising elected representatives from across India's states and union territories, it holds the power to make and pass laws, approve the budget, and oversee the executive branch.Led by the Prime Minister, the Lok Sabha plays a pivotal role in shaping India's governance, policymaking, and socio-economic development, embodying the essence of participatory democracy in the world's largest democracy.</p>
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