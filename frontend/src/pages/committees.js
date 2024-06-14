import '../styles/committees.css'
import Contact from '../components/contact'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { gsap, ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'

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
    useGSAP(() => {
        if (window.innerWidth > 1200) {
            const lenis = new Lenis()
            lenis.on('scroll', ScrollTrigger.update)

            gsap.ticker.add((time) => {
                lenis.raf(time * 1000)
            })

            gsap.ticker.lagSmoothing(0)

            gsap.registerPlugin(ScrollTrigger);
            const comms = document.querySelector('.committees')

            const items = gsap.utils.toArray('.comm')

            function getScrollAmount() {
                let width = comms.scrollWidth
                return -(width - window.innerWidth)
            }

            gsap.to(items, {
                x: getScrollAmount,
                ease: "none",
                duration: 0.1,
                scrollTrigger: {
                    trigger: '.committees',
                    pin: true,
                    start: 'top 12.5%',
                    scrub: true,
                    end: () => `+=${getScrollAmount() * -1} + 100`
                }
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
                <section className='comm' id="board-room">
                    <CommLink to="/committees/board-room">Board Room</CommLink>
                </section>
                <section className='comm' id="ccc">
                    <CommLink to="/committees/ccc">CCC</CommLink>
                </section>
            </div>
        </div>
        <Contact></Contact>
    </div>
}