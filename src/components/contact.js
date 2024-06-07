import { useEffect } from 'react';
import '../styles/contact.css'
import instagram from '../assets/instagram.png'

import AOS from 'aos';
import 'aos/dist/aos.css';

function Contact() {
    useEffect(() => {
        AOS.init({duration: 1000})
    }, [])

    return <div data-aos="fade-in">
        <div className='gradient'></div>
        <div className='content'>
            <h1>Contact Us</h1>
            <div className='contact-details'>
                <div className='phone'>
                    <h2>Phone</h2>
                    <div className='details'>
                        <div id="p1">
                            <p>Number</p>
                            <p>Person</p>
                            <p>Role</p>
                        </div>
                        <div id="p2">
                            <p>Number</p>
                            <p>Person</p>
                            <p>Role</p>
                        </div>
                    </div>
                </div>
                <div className='mail'>
                    <h2>Mail</h2>
                    <p>Mail@mail.com</p>
                </div>
                <div className='social'>
                    <h2>Socials</h2>
                    <a href="https://instagram.com/dwmun"><img src={instagram} height={"20%"} width={"20%"} style={{filter: "invert(1)"}}></img></a>
                </div>
            </div>
        </div>
    </div>
}

export default Contact;