import logo from '../../assets/logo.webp';
import DISECLogo from '../../assets/comm-logos/DISEC.png'
import { useState } from 'react'
import CoChair1 from '../../assets/eb/disec/co-chair-1.jpeg'
import CoChair2 from '../../assets/eb/disec/co-chair-2.jpeg'
import Moderator from '../../assets/eb/disec/moderator.jpeg'
import BG from '../../assets/background-guides/DISEC_BG.pdf'

export default function DISEC() {
    const [about, setAbout] = useState(0)
    const [aboutEB, setAboutEB] = useState(0)

    const updateSlides = (classname, navigator, index) => {
        const slides = document.getElementsByClassName(classname)

        for (let i = 0; i < slides.length; i++) {
            if (i !== index) {
                slides[i].classList.add("inactive")
                slides[i].classList.remove("active")
            } else {
                slides[i].classList.remove("inactive")
                slides[i].classList.add("active")
            }
        }

        const obj = document.getElementsByClassName(navigator)
        for (let i = 0; i < obj[0].children.length; i++) {
            obj[0].children[i].style.opacity = i == index ? 1 : 0.5
        }
    }

    const handleMouseMove = e => {
        const { currentTarget: target } = e

        const rect = target.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top

        target.style.setProperty('--mouse-x', `${x}px`)
        target.style.setProperty('--mouse-y', `${y}px`)
    }

    return <div className="comm-content">
        <div className="comm-header" onMouseMove={handleMouseMove}>
            <h1>DISEC</h1>
            <h2 className='agenda-word'>Agenda:</h2>
            <p>Discussing the need for a legal framework regarding PMCs (Private Military Companies)</p>
        </div>
        <div className="carousel" onMouseMove={handleMouseMove}>
            <a className='left-nav' onClick={() => {
                setAbout((prev) => {
                    updateSlides('slide', 'information', 1 + (prev - 1) % 2)
                    return (prev - 1) % 2
                })
            }}>〈</a>
            <a className='right-nav' onClick={() => {
                setAbout((prev) => {
                    updateSlides('slide', 'information', (prev + 1) % 2)
                    return (prev + 1) % 2
                })
            }}>〉</a>
            <div className="slide active">
                <h1>About the Committee</h1>
                <p>The Disarmament and International Security Committee, also known as the First Committee of the United Nations General Assembly, focuses on disarmament, global challenges, and threats to peace that affect the international community. DISEC addresses issues related to disarmament, arms control, and the regulation of weapons of mass destruction. It seeks to promote international peace and security through dialogue and negotiation, aiming to reduce the potential for conflict and enhance global stability. Topics discussed in DISEC range from nuclear disarmament and the proliferation of small arms to outer space security and cyber warfare.</p>
            </div>
            <div className="slide inactive" id="logo">
                <img src={DISECLogo} height={"100%"}></img>
            </div>
            <div className='nav-controller information'>
                <a data-active='true' onClick={() => {
                    updateSlides("slide", "information", 0)
                }}></a>
                <a data-active='false' onClick={() => {
                    updateSlides("slide", "information", 1)
                }}></a>
            </div>
        </div>
        <div className="bg-guide" onMouseMove={handleMouseMove}>
            <a href={BG} target='_blank'>
                <h1>Background</h1>
                <h1>Guide</h1>
                <p>Available now!</p>
            </a>
        </div>
        <div className="chair" onMouseMove={handleMouseMove}>
            <a className='left-nav' onClick={() => {
                setAboutEB((prev) => {
                    updateSlides('chairperson', 'eb', (prev + 2) % 3)
                    return (prev + 2) % 3
                })
            }}>〈</a>
            <a className='right-nav' onClick={() => {
                setAboutEB((prev) => {
                    updateSlides('chairperson', 'eb', (prev + 1) % 3)
                    return (prev + 1) % 3
                })
            }}>〉</a>
            <h1>Chairpersons</h1>
            <div className='chairperson active'>
                <h1>Shloak Gupta</h1>
                <img src={CoChair1}></img>
                <p>Co-Chairperson</p>
            </div>
            <div className='chairperson inactive'>
                <h1>Ritobrata Sarkar</h1>
                <img src={CoChair2}></img>
                <p>Co-Chairperson</p>
            </div>
            <div className='chairperson inactive'>
                <h1>Priyanshu Biswas</h1>
                <img src={Moderator}></img>
                <p>Vice Chairperson</p>
            </div>
            <div className='nav-controller eb'>
                <a data-active='true' onClick={() => {
                    updateSlides("chairperson", "eb", 0)
                }}></a>
                <a data-active='false' onClick={() => {
                    updateSlides("chairperson", "eb", 1)
                }}></a>
                <a data-active='false' onClick={() => {
                    updateSlides("chairperson", "eb", 2)
                }}></a>
            </div>
        </div>
        <div className="matrix" onMouseMove={handleMouseMove}>
            <h1>Country Matrix</h1>
            <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTkwWKYZ9zowk2fsNEyyEbD7xAhUR5sEFBC7oQdl8FL4p53SNfBggNG6Cyxw4b2h2R86Dwbj99yiWnP/pubhtml?gid=1768273203&amp;single=true&amp;widget=true&amp;headers=false"></iframe>
        </div>
    </div>
}