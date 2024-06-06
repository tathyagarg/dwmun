import '../styles/committees.css'
import Contact from '../components/contact'

function Committees() {
    return <div>
        <div className="all">
            <h1 className='header'>Committees</h1>
            <div className='committees'>
                <section className='comm' id="unsc">
                    <h1>UNSC</h1>
                    <p>Coming soon...</p>
                    {/* <button className='learn-more'>Learn More</button> */}
                </section>
                <section className='comm' id="unhrc">
                    <h1>UNHRC</h1>
                    <p>Coming soon...</p>
                </section>
                <section className='comm' id="disec">
                    <h1>DISEC</h1>
                    <p>Coming soon...</p>
                </section>
                <section className='comm' id="lok-sabha">
                    <h1>Lok Sabha</h1>
                    <p>Coming soon...</p>
                </section>
                <section className='comm' id="ipc">
                    <h1>IPC</h1>
                    <p>Coming soon...</p>
                </section>
                <section className='comm' id="ssci">
                    <h1>SSCI</h1>
                    <p>Coming soon...</p>
                </section>
                <section className='comm' id="ccc">
                    <h1>CCC</h1>
                    <p>Coming soon...</p>
                </section>
            </div>
        </div>
        <Contact></Contact>
    </div>
}

export default Committees