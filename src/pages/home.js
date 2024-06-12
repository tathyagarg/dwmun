import '../styles/home.css'
import Contact from '../components/contact';
import Countdown from '../components/countdown';
import logo from '../assets/logo.webp';

const start_date = new Date('August 01, 2024 08:00:00').getTime();

function updateDate() {
    const current = new Date().getTime();

    const difference = start_date - current;

    const day_count = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours_count = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes_count = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    try {
        document.getElementById("days").textContent = ((day_count === 0) ? "0" : "") + ((day_count < 10) ? "0" : "") + day_count;
        document.getElementById("hours").textContent = ((hours_count === 0) ? "0" : "") + ((hours_count < 10) ? "0" : "") + hours_count;
        document.getElementById("minutes").textContent = ((minutes_count === 0) ? "0" : "") + ((minutes_count < 10) ? "0" : "") + minutes_count;
    } catch (err) {
        ;
    }
}


function Home() {
    window.scroll(0, 0)
    new Promise(resolve => setTimeout(resolve, 1000)).then(updateDate);
    setInterval(updateDate, (1000 * 60))

    return <div>
        <section className="title">
            <img src={logo} className='dwmun-logo' style={{height: "40vh"}}></img>
            <div className="header">
                <h1>D</h1>
                <h1>W</h1>
                <h1>M</h1>
                <h1>U</h1>
                <h1>N</h1>
                <h1>2</h1>
                <h1>4</h1>
            </div>
            <p>The 6th Edition</p>
            <div className='flags'>

            </div>
        </section>
        <section className="about">
            <div className="about-div">
                <div className="about-heading">
                    <ul>
                        <li><h2>About</h2></li>
                        <li><h1>Delhi Public School Whitefield</h1></li>
                        <li><h1>Model United Nations</h1></li>
                    </ul>
                </div>
                <p style={{width: "100%"}}>
                    Dear Future Leaders and Global Citizens,
                </p><p>
                    We are thrilled to announce that DWMUN is back, better than ever, with our prestigious 6th edition. Over the years, DWMUN has established itself as a beacon of excellence, renowned for fostering high-quality debates and offering a robust platform for intellectual exchange and learning.
                </p><p>
                    This year, we are proud to present an expanded and meticulously crafted framework designed to challenge and inspire delegates. With seven diverse and dynamic committees, we ensure that every participant has the opportunity to delve into a wide array of pressing global issues, refining their diplomatic skills and broadening their perspectives.
                </p><p>
                    Get ready to unleash your diplomatic prowess, amplify your voice, and inspire change alongside like-minded individuals from across the globe. At DWMUN, we are committed to providing an environment where ideas can flourish and future leaders can shine. Backed by a team of experienced candidates, our conference promises not only rigorous debate but also meaningful collaboration. Here, students are given a powerful platform to voice their insights and propose solutions that have the potential to transform our world.
                </p><p>
                    Join us as we gather the brightest minds to debate, learn, and lead. Together, let's strive to improve the people, the place, and the scenarios that shape our global community. Seize this opportunity to be part of a legacy of excellence and impact and to continue the bequest of excellence and create new milestones in the world of Model United Nations.
                </p><p>
                    Mark your calendars and be part of the dynamic journey at DWMUN. We can't wait to see you there, ready to engage, debate, and lead!
                </p>
            </div>
        </section>
        <section id='principal-letter-section'>
            <div id='principal-letter'>
                <h1>Letter from the Principal</h1>
                <div id='principal-letter-content'>
                    <div id='image-placeholder-3'></div>
                    <div id='letter'>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque eget magna sed laoreet. Vivamus pellentesque luctus sem vitae maximus. Aenean vehicula mollis mi sit amet ultricies. Curabitur fermentum dolor lacus, id malesuada lacus pellentesque sed. Suspendisse iaculis felis ac nibh aliquet aliquet. Curabitur vitae tincidunt enim. Nunc ultrices mauris a lacus commodo, dictum interdum nibh convallis.
                        </p><p>
                            Aliquam vitae dictum dolor. Sed semper neque ac justo egestas consectetur. Aliquam eget mauris laoreet ante hendrerit fermentum. In ornare nunc ut vestibulum ullamcorper. Curabitur dictum mollis leo, sit amet luctus elit tempor ut. Vestibulum dapibus sem et erat finibus, non porta ex hendrerit. Maecenas congue blandit pellentesque. Sed augue tortor, efficitur eu leo sed, congue varius magna. Sed ac tortor eget libero sollicitudin aliquam. Integer feugiat nunc in neque accumsan, euismod rutrum dolor sollicitudin. Phasellus semper lorem ac placerat malesuada. Sed aliquet imperdiet tellus elementum dignissim. Curabitur faucibus lectus urna, sed gravida tellus efficitur in. Nullam hendrerit turpis ut interdum venenatis. Praesent velit orci, maximus non augue ac, dignissim lobortis est.
                        </p><p>
                            Nunc congue, justo vel pellentesque lacinia, neque urna imperdiet mi, ut dictum turpis ipsum ac velit. Aliquam elementum vel arcu efficitur tincidunt. Fusce in efficitur felis, nec dictum tellus. Vestibulum vestibulum velit at leo tempus volutpat. Nunc felis lorem, ornare nec fermentum vel, consectetur sed orci. Fusce bibendum arcu a ante pellentesque, quis pharetra nulla bibendum. Integer facilisis mi a purus fringilla, vitae gravida ipsum volutpat. Quisque tempor sit amet sem vel pellentesque. Fusce commodo sed sem at viverra. Proin eget libero in enim aliquet condimentum. Maecenas dapibus purus at sem auctor condimentum. Pellentesque consequat vestibulum arcu. Aenean ac malesuada ex. Vestibulum a lobortis massa. Duis non nibh non ex suscipit convallis. Proin porttitor mi sed ligula dictum, sed mollis nulla interdum.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <Countdown></Countdown>
        <Contact></Contact>
    </div>
}

export default Home;