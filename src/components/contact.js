import { useEffect } from 'react';
import '../styles/contact.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Contact() {
    useEffect(() => {
        AOS.init({duration: 1000})
    }, [])

    return <div data-aos="fade-up">
        <div className='gradient'></div>
        <div className='content'>
            <h1>Contact Us</h1>
        </div>
    </div>
}

export default Contact;