import React, {useEffect} from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/countdown.css'


export default function Countdown() {
    useEffect(() => {
        AOS.init({duration: 1000})
    }, []);

    return <div>
        <section data-aos="zoom-in" className="countdown">
            <h1>
                BIGGER. BETTER. BRIGHTER.
            </h1>
            <p>
                The conference starts in:
            </p>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0"}} id="date">
                <div>
                    <h2 id="days">00</h2>
                    <h3>Days</h3>
                </div>
                <div>
                    <h2 id="hours">00</h2>
                    <h3>Hours</h3>
                </div>
                <div>
                    <h2 id="minutes">00</h2>
                    <h3>Minutes</h3>
                </div>
            </div>
            <div style={{marginBottom: "10vh", fontSize: "3vh"}}>
                1st, 2nd, and 3rd August
            </div>
        </section>
    </div>
}