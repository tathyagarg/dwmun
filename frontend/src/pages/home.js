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
                        Year after year, the United Nations debate on vital global issues and share resolutions in an attempt to bring about positive changes in the world. However, the SDG report of 2024 has clearly acknowledged that the world is failing to make measurable progress in many areas, especially in bringing peace between nations, reversing climate change and ensuring global financial stability.
This makes it even more vital that young people, as citizens of the world, must come together and look for genuine and feasible solutions to global issues that will have a huge impact on the future of this planet and on the survival of nations.</p><p>
School MUNs provide the best platform for future leaders to deliberate on burning global matters and hone their leadership skills through engaging debates and meaningful dialogues.
DPS Whitefield is happy to announce the sixth edition of DWMUN scheduled to be held from Thursday 1st August to Saturday 3rd August 2024.</p><p>
I am certain that DW Model United Nations Conference- 2024 will be an extraordinary experience for all the delegates of schools that join us in this scintillating journey. I hereby extend a warm welcome to all the participants and wish them all the very best.
</p><p>
Mrs. Lovely Dutta Prusty<br/>
Principal
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