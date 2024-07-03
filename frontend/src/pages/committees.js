import '../styles/committees.css'
import Contact from '../components/contact'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const CommLink = styled(Link)`
    font-size: 20vh;
    line-height: 20vh;
    margin-top: 0;
    margin-bottom: 1%;
    font-weight: 700;

    width: fit-content;
    text-decoration: none;

    color: white;

    transition-duration: 500ms;

    &::before {
        content: 'The';
        display: block;
        font-size: 5vh;
        line-height: 5vh;
    }
`

export default function Committees() {
    return <div>
        <div className="all">
            <h1 className='header'>Committees</h1>
            <div className='jumpto-bar'>
                <a href='#unsc'>UNSC</a>
                <a href='#unhrc'>UNHRC</a>
                <a href='#disec'>DISEC</a>
                <a href='#lok-sabha'>Lok Sabha</a>
                <a href='#ipc'>IPC</a>
                <a href='#committee-x'>Committee X</a>
                <a href='#ccc'>CCC</a>
            </div>
            <div className='committees' id="committees">
                <section className='comm' id="unsc">
                    <CommLink to="/committees/unsc" draggable="false">UNSC</CommLink>
                </section>
                <section className='comm' id="unhrc">
                    <CommLink to="/committees/unhrc" draggable="false">UNHRC</CommLink>
                </section>
                <section className='comm' id="disec">
                    <CommLink to="/committees/disec" draggable="false">DISEC</CommLink>
                </section>
                <section className='comm' id="lok-sabha">
                    <CommLink to="/committees/lok-sabha" draggable="false">Lok Sabha</CommLink>
                </section>
                <section className='comm' id="ipc">
                    <CommLink to="/committees/ipc" draggable="false">IPC</CommLink>
                </section>
                <section className='comm' id="committee-x">
                    <CommLink to="/committees/committee-x" draggable="false">Committee X</CommLink>
                </section>
                <section className='comm' id="ccc">
                    <CommLink to="/committees/ccc" draggable="false">CCC</CommLink>
                </section>
            </div>
        </div>
        <Contact></Contact>
    </div>
}