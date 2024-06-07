import logo from '../../assets/logo.png';

function UNHRC() {
    window.scroll(0, 0);
    return <div className="comm-content">
        <h1 className="comm-header">
            UNHRC
        </h1>
        <p className="agenda">Lorem ipsum</p>
        <p><b>The United Nations Human Rights Council</b> is a vital organ of the United Nations, established in 2006, responsible for promoting and protecting human rights globally. Composed of 47 member states elected by the UN General Assembly, the UNHRC addresses human rights violations, conducts periodic reviews of member states' human rights records, and recommends actions to uphold human rights standards. Through resolutions, investigations, and reports, it tackles issues ranging from civil and political rights to economic, social, and cultural rights. Despite criticisms of politicization and selectivity, the UNHRC remains a crucial platform for advancing human rights discourse and fostering international cooperation.</p>
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

export default UNHRC;