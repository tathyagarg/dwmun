import '../styles/committees.css'
import Contact from '../components/contact'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { gsap, ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'

const CommLink = styled(Link)`
    font-size: 20vh;
    line-height: 20vh;
    margin-top: 0;
    margin-bottom: 1%;
    font-weight: 700;

    color: black;
    width: fit-content;
    text-decoration: none;

    color: white;

    text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000,
    1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000;
    transition-duration: 500ms;

    &::before {
        content: 'The';
        display: block;
        font-size: 5vh;
        line-height: 5vh;
    }
`

function Committees() {
    // if (window.innerWidth > 1200)
    useGSAP(() => {
        if (window.innerWidth > 1200) {
            console.log('using gsap')
            gsap.registerPlugin(ScrollTrigger);
            const comms = document.querySelector('.committees')

            const items = gsap.utils.toArray('.comm')

            function getScrollAmount() {
                let width = comms.scrollWidth
                return -(width - window.innerWidth)
            }

            const tween = gsap.to(items, {
                x: getScrollAmount,
                ease: "none",
                duration: 1,
            })

            ScrollTrigger.create({
                trigger: '.committees',
                pin: true,
                start: 'top top',
                scrub: true,
                snap: 1 / 6,
                end: () => `+=${getScrollAmount() * -1} + 100`,
                animation: tween
            })
        }
    })

    return <div>
        <div className="all">
            <h1 className='header'>Committees</h1>
            <div className='committees' id="committees">
                <section className='comm' id="unsc">
                    <CommLink to="/committees/unsc">UNSC</CommLink>
                </section>
                <section className='comm' id="unhrc">
                    <CommLink to="/committees/unhrc">UNHRC</CommLink>
                </section>
                <section className='comm' id="disec">
                    <CommLink to="/committees/disec">DISEC</CommLink>
                </section>
                <section className='comm' id="lok-sabha">
                    <CommLink to="/committees/lok-sabha">Lok Sabha</CommLink>
                </section>
                <section className='comm' id="ipc">
                    <CommLink to="/committees/ipc">IPC</CommLink>
                </section>
                <section className='comm' id="ssci">
                    <CommLink to="/committees/ssci">SSCI</CommLink>
                </section>
                <section className='comm' id="ccc">
                    <CommLink to="/committees/ccc">CCC</CommLink>
                </section>
            </div>
        </div>
        <Contact></Contact>
    </div>
}

export default Committees