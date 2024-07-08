import '../styles/home.css'
import Contact from '../components/contact';
import Countdown from '../components/countdown';
import logo from '../assets/logo.webp';
import rotary from '../assets/rotary.png'
import SecGen from '../assets/secretariat/secretary-general.jpeg'
import Principal from '../assets/principal.jpeg'

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
                    <img src={Principal} id='image-placeholder-3'></img>
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
                        <p>Distinguished Guests, Teachers, and Delegates,</p><p>

It is my pleasure to welcome you to the 6th edition of Delhi Public School, Whitefield’s Model United Nations, DWMUN’24.</p><p>

Starting out as a young delegate at this very conference, I have been a part of both ends of the spectrum, as a delegate and as an EB members. But today, I am addressing you all as the secretary general for this conference, a post I hold very close to my part. DWMUN has played an important role in my life, helping me understand international politics, laws, and much more. DWMUN acts as the perfect platform for young delegates to make a mark on the world and receive knowledge outside of the classroom.</p><p>
In my experience, MUNs are no longer competitions but hubs of knowledge for delegates to learn and grow. So thus, with a warm heart, I welcome you to DWMUN’24.</p><p>

See you all on the 1st, 2nd and 3rd of August!</p><p>
Regards,</p><p>
Shrisai Hari<br/>
Secretary General<br/>
DWMUN’24
</p>
                    </div>
                    <img src={SecGen} id='image-placeholder-3' style={{objectPosition: "30% center"}}></img>
                </div>
            </div>
        </section>
        <Countdown></Countdown>
        <Contact></Contact>
    </div>
}