import logo from '../../assets/logo.webp';
import LokSabhaLogo from '../../assets/comm-logos/LokSabha.png'

export default function LokSabha() {
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

    window.scroll(0, 0);
    return <div className="comm-content">
        <div className="comm-header" onMouseMove={handleMouseMove}>
            <h1>Lok Sabha</h1>
        </div>
        <div className="agenda-header" onMouseMove={handleMouseMove}>
            <h1>Agenda</h1>
            <p>Lorem ipsum dolor, sit amet</p>
        </div>
        <div className="carousel" onMouseMove={handleMouseMove}>
            <div className="slide active">
                <h1>About the Agenda</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada, orci non placerat vestibulum, quam orci pharetra dolor, sit amet consequat urna justo non leo. Cras suscipit, erat accumsan semper pellentesque, lorem tellus hendrerit lacus, quis blandit turpis neque sit amet justo. Aenean varius felis ipsum. Cras sagittis at nunc nec commodo. Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam viverra purus sed egestas pellentesque. Cras blandit eleifend arcu. In eu ex mattis, congue nulla id, mollis purus. Duis laoreet, ipsum vitae ultricies consequat, nisl mauris varius magna, sit amet pharetra ante dui quis lacus. Aenean ut enim consequat, sodales libero at, pretium est.</p>
            </div>
            <div className="slide inactive">
                <h1>About the Committee</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada, orci non placerat vestibulum, quam orci pharetra dolor, sit amet consequat urna justo non leo. Cras suscipit, erat accumsan semper pellentesque, lorem tellus hendrerit lacus, quis blandit turpis neque sit amet justo. Aenean varius felis ipsum. Cras sagittis at nunc nec commodo. Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam viverra purus sed egestas pellentesque. Cras blandit eleifend arcu. In eu ex mattis, congue nulla id, mollis purus. Duis laoreet, ipsum vitae ultricies consequat, nisl mauris varius magna, sit amet pharetra ante dui quis lacus. Aenean ut enim consequat, sodales libero at, pretium est.</p>
            </div>
            <div className="slide inactive" id="logo">
                <img src={LokSabhaLogo} height={"100%"}></img>
            </div>
            <div className='nav-controller information'>
                <a onClick={() => {
                    updateSlides("slide", "information", 0)
                }}></a>
                <a onClick={() => {
                    updateSlides("slide", "information", 1)
                }}></a>
                <a onClick={() => {
                    updateSlides("slide", "information", 2)
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
            <h1>Chairpersons</h1>
            <div className='chairperson active'>
                <h1>Name</h1>
                <img src={logo}></img>
                <p>Chairperson</p>
            </div>
            <div className='chairperson inactive'>
                <h1>Name</h1>
                <img src={logo}></img>
                <p>Chairperson</p>
            </div>
            <div className='chairperson inactive'>
                <h1>Name</h1>
                <img src={logo}></img>
                <p>Moderator</p>
            </div>
            <div className='nav-controller eb'>
                <a onClick={() => {
                    updateSlides("chairperson", "eb", 0)
                }}></a>
                <a onClick={() => {
                    updateSlides("chairperson", "eb", 1)
                }}></a>
                <a onClick={() => {
                    updateSlides("chairperson", "eb", 2)
                }}></a>
            </div>
        </div>
        <div className="matrix" onMouseMove={handleMouseMove}>
            <h1>Country Matrix</h1>
            <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSMBfKFMRBXz3MvB1DmcWKtSh7BgP-Vk6frtT0wpv9TNxTbqDAK18Sf19UxwCkH9NlSZFtrPeqXVaa2/pubhtml?gid=1495021896&amp;single=true&amp;widget=true&amp;headers=false"></iframe>
        </div>
    </div>
}