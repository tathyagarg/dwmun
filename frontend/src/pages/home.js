import '../styles/home.css'
import Contact from '../components/contact';
import Countdown from '../components/countdown';
import logo from '../assets/logo.webp';
import rotary from '../assets/rotary.png'

const start_date = new Date('August 01, 2024 08:00:00').getTime();

function updateDate() {
    const current = new Date().getTime();

    const difference = start_date - current;

    const day_count = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours_count = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes_count = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    try {
        document.getElementById("days").textContent = ((day_count < 10) ? "0" : "") + day_count;
        document.getElementById("hours").textContent = ((hours_count < 10) ? "0" : "") + hours_count;
        document.getElementById("minutes").textContent = ((minutes_count < 10) ? "0" : "") + minutes_count;
    } catch (err) {
        ;
    }
}


export default function Home() {
    window.scroll(0, 0)
    new Promise(resolve => setTimeout(resolve, 1000)).then(updateDate);
    setInterval(updateDate, (1000 * 60))

    return <div>
        <section className="title">
            <div className='logo-container'>
                <img src={logo} className='dwmun-logo' style={{height: "40vh"}}></img>
                <img src={rotary} className='rotary-logo'></img>
            </div>
            <div className="header">
                <h1>D</h1>
                <h1>W</h1>
                <h1>M</h1>
                <h1>U</h1>
                <h1>N</h1>
                <h1>'</h1>
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
        <section id='oc-letter-section'>
            <div id='oc-letter'>
                <h1>Letter from the Secretary General</h1>
                <div id='oc-letter-content'>
                    <div id='actual-oc-letter'>
                        <p>
                    Dear Delegates, Distinguished Guests, and Esteemed Participants,
It is with great pleasure and excitement that I welcome you to the sixth edition of Delhi Public School Whitefield Model United Nations, DWMUN’24. As the Secretary General, I am honoured to share my journey with you and express my utmost enthusiasm for the remarkable experiences that await each and every one of you.
</p><p>
Reflecting upon my own MUN journey, I vividly recall the momentous beginning that shaped my passion for diplomacy and global affairs. It was in the 8th grade when I first stepped into the realm of MUNs, embarking on an adventure that would forever change my life. The committee I was assigned to was the Social, Humanitarian, and Cultural Committee (SOCHUM), an assembly of nearly 80 individuals united by their shared commitment to address pressing global issues.
</p><p>
As I entered the committee room, a wave of excitement and apprehension washed over me. Thoughts flooded my mind, wondering if I would ever get the chance to voice my opinions amidst such a vast gathering of talented delegates. However, much to my surprise, the dynamics of the committee quickly transformed. Within the first hour of the session, I found myself speaking on three separate occasions, capturing the attention of my fellow delegates and making a meaningful contribution to the discussions at hand. Throughout the three days, I not only spoke multiple times but learned from other delegates too. I learned that MUNs were not only about public speaking and research, but were a complex mix of research, diplomacy, and confidence among others. This motivated me to attend more conferences and hone my skills to perfection.
</p><p>
Today, I have attended over 35 plus conferences and while I still don’t believe I’ve reached “perfection,” I am able to quote laws and articles that I once did know existed off the top of my head and teach upcoming MUN delegates in the circuit too. I am proud to be part of some of the best delegations across the MUN circuit and win awards at prestigious institutions.
</p><p>
So, I hope MUNs are able to play an impact on your lives, similar to mine. With that, I wish you all a memorable and rewarding Model United Nations experience. May you leave this conference empowered with the belief that each one of you possesses the capacity to shape a better world.
</p><p>

Regards,
</p><p>
Shrisai Hari
<br/>
Secretary General
<br/>
DWMUN’24
</p>
                    </div>
                    <div id='image-placeholder-3'></div>
                </div>
            </div>
        </section>
        <Countdown></Countdown>
        <Contact></Contact>
    </div>
}