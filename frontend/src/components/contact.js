import { useEffect } from 'react';
import '../styles/contact.css'
import instagram from '../assets/instagram.png'

import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Contact() {
    useEffect(() => {
        AOS.init({duration: 1000})
    }, [])

    return <div>
        <div className='content'>
            <div className='left'>
                <h1>Contact Us</h1>
                <div className='contact-details'>
                    <div className='phone'>
                        <h2>Phone</h2>
                        <div className='details'>
                            <div id="p1">
                                <p>+91 75502 87715</p>
                                <p>Shrisai Hari</p>
                                <p>Secretary General</p>
                            </div>
                            <div id="p2">
                                <p>+91 88672 81354</p>
                                <p>Chirantana Hegde</p>
                                <p>Director General</p>
                            </div>
                        </div>
                    </div>
                    <div className='mail'>
                        <h2>Mail</h2>
                        <p>mundpsw@gmail.com</p>
                    </div>
                    <div className='social'>
                        <h2>Socials</h2>
                        <a href="https://instagram.com/dwmun"><img src={instagram} height={"20%"} width={"20%"} style={{filter: "invert(1)"}}></img></a>
                    </div>
                </div>
            </div>
            <div className='right'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.370167319226!2d77.7783073745472!3d13.012083413990453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae0e504a72d869%3A0xb74cb38cf8557f3f!2sDPS%20Whitefield%20Mallasandra!5e0!3m2!1sen!2sin!4v1718614828570!5m2!1sen!2sin" style={{border: 0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className='map'></iframe>
            </div>
        </div>
    </div>
}