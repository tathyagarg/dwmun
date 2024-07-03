import logo from '../../assets/logo.webp';
import IPCLogo from '../../assets/comm-logos/IPC.png'
import { useState } from 'react'
// import CoChair1 from '../../assets/eb/IPC/co-chair-1.jpeg'
// import CoChair2 from '../../assets/eb/IPC/co-chair-2.png'
// import Moderator from '../../assets/eb/IPC/moderator.jpg'

const CoChair1 = logo;
const CoChair2 = logo;
const Moderator = logo;

export default function IPC() {
    const [about, setAbout] = useState(0)

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
            <h1>IPC</h1>
        </div>
        <div className="carousel" onMouseMove={handleMouseMove}>
            <a className='left-nav' onClick={() => {
                setAbout((prev) => {
                    updateSlides('slide', 'information', 1 + (prev - 1) % 2)
                    return (prev - 1) % 2
                })
            }}>←</a>
            <a className='right-nav' onClick={() => {
                setAbout((prev) => {
                    updateSlides('slide', 'information', (prev + 1) % 2)
                    return (prev + 1) % 2
                })
            }}>→</a>
            <div className="slide active">
                <h1>About the Committee</h1>
                <p>The International Press Corps in Model United Nations is a committee dedicated to simulating the role of journalists and media organizations in covering international events and crises. Delegates act as reporters, editors, and correspondents representing various global news outlets. The IPC’s primary responsibilities include observing debates, conducting interviews, and publishing articles that reflect the proceedings and developments within other MUN committees. By writing news reports, opinion pieces, and investigative articles, the IPC ensures transparency and provides a platform for diverse perspectives. This committee highlights the importance of media in shaping public opinion and influencing policy through accurate and unbiased reporting.</p>
            </div>
            <div className="slide inactive" id="logo">
                <img src={IPCLogo} height={"100%"}></img>
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
            <h1>Chairperson</h1>
            <div className='chairperson active'>
                <h1>Saniya Philip</h1>
                <img src={CoChair1}></img>
                <p>Chairperson</p>
            </div>

        </div>
        <div className="matrix" onMouseMove={handleMouseMove}>
            <h1>Portfolio Matrix</h1>
            {/* <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSMBfKFMRBXz3MvB1DmcWKtSh7BgP-Vk6frtT0wpv9TNxTbqDAK18Sf19UxwCkH9NlSZFtrPeqXVaa2/pubhtml?gid=1495021896&amp;single=true&amp;widget=true&amp;headers=false"></iframe> */}
            <h2>Coming Soon!</h2>
        </div>
    </div>
}