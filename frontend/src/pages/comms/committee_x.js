import logo from '../../assets/logo.webp';
import CommitteeXLogo from '../../assets/comm-logos/CommitteeX.png'
import { useState } from 'react'
import CoChair1 from '../../assets/eb/committee-x/co-chair-1.jpeg'
import CoChair2 from '../../assets/eb/committee-x/co-chair-2.jpeg'
import Moderator from '../../assets/eb/committee-x/moderator.jpeg'

export default function CommitteeX() {
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
            <h1>Committee X</h1>
            <h2 className='agenda-word'>Agenda:</h2>
            <p>Black Rock</p>
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
                <p className='comm-x-desc'>Take the challenge.</p>
            </div>
            <div className="slide inactive" id="logo">
                <img src={CommitteeXLogo} height={"100%"}></img>
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
                <p>No Background Guide will be provided.</p>
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
                <h1>Alfred Thomas</h1>
                <img src={CoChair1}></img>
                <p>Co-Chairperson</p>
            </div>
            <div className='chairperson inactive'>
                <h1>Sohom Niyogi</h1>
                <img src={CoChair2}></img>
                <p>Co-Chairperson</p>
            </div>
            <div className='chairperson inactive'>
                <h1>Vansh Tandon</h1>
                <img src={Moderator}></img>
                <p>Moderator</p>
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
            <h1>Matrix</h1>
            <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTkwWKYZ9zowk2fsNEyyEbD7xAhUR5sEFBC7oQdl8FL4p53SNfBggNG6Cyxw4b2h2R86Dwbj99yiWnP/pubhtml?gid=655421433&amp;single=true&amp;widget=true&amp;headers=false"></iframe>
            {/* <h2>Coming Soon!</h2> */}
        </div>
    </div>
}