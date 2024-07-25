import logo from '../../assets/logo.webp';
import UNHRCLogo from '../../assets/comm-logos/UNHRC.png'
import { useState } from 'react'
import CoChair1 from '../../assets/eb/unhrc/co-chair-1.jpeg'
import CoChair2 from '../../assets/eb/unhrc/co-chair-2.png'
import Moderator from '../../assets/eb/unhrc/moderator.jpg'

export default function UNHRC() {
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
            <h1>UNHRC</h1>
            <h2 className='agenda-word'>Agenda:</h2>
            <p>Discussing the legal framework around custodial violence</p>
        </div>
        {/* <div className="agenda-header" onMouseMove={handleMouseMove}>
            <h1>Agenda</h1>
            <p>Discussing the legal framework around custodial violence</p>
        </div> */}
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
                <p>The United Nations Human Rights Council is an intergovernmental body within the UN system responsible for strengthening the promotion and protection of human rights around the globe. It addresses situations of human rights violations and makes recommendations on them. The UNHRC is made up of 47 member states, elected by the General Assembly, and works closely with the Office of the High Commissioner for Human Rights (OHCHR). The Council conducts Universal Periodic Reviews of all UN member states, ensuring that every country’s human rights record is examined and discussed. Through resolutions and reports, the UNHRC aims to address human rights challenges and support the advancement of international human rights standards.</p>
            </div>
            <div className="slide inactive" id="logo">
                <img src={UNHRCLogo} height={"100%"}></img>
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
            <a>
                <h1>Background</h1>
                <h1>Guide</h1>
                <p>(Will be shared shortly)</p>
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
                <h1>Algin Thomas</h1>
                <img src={CoChair1}></img>
                <p>Co-Chairperson</p>
            </div>
            <div className='chairperson inactive'>
                <h1>Jovan Hippargi</h1>
                <img src={CoChair2}></img>
                <p>Co-Chairperson</p>
            </div>
            <div className='chairperson inactive'>
                <h1>Shivam Chatterjee</h1>
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
            <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTkwWKYZ9zowk2fsNEyyEbD7xAhUR5sEFBC7oQdl8FL4p53SNfBggNG6Cyxw4b2h2R86Dwbj99yiWnP/pubhtml?gid=754926755&amp;single=true&amp;widget=true&amp;headers=false"></iframe>
            {/* <h2>Coming Soon!</h2> */}
        </div>
    </div>
}