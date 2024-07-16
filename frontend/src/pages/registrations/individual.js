import { useState } from 'react'
import '../../styles/registration_pages.css'
import Contact from '../../components/contact'
import CodeOfConduct from '../../assets/DWMUN\'24\ Code\ of\ Conduct.pdf'
import QRCode from '../../assets/qr-code.jpeg'

export default function IndividualRegistration() {
    const [proof, setproof] = useState(null);
    const [comm1, setComm1] = useState("")
    const [comm2, setComm2] = useState("")
    const [comm3, setComm3] = useState("")
    const [doubleGrade, setDoubleGrade] = useState(0)
    const [amt, setAmt] = useState(950)

    const purify = (word) => {
        return word
            .toLowerCase()
            .split('_')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ')
            .replace("Double", "Partner's")
            .replace("Comm", "Commitee")
            .replace("Country", "Portfolio Preference")
    }

    const handlePrimaryCommChange = e => {
        if (e.target.value === "UNSC") {
            document.getElementById("double-info").classList.add("shown")
            setAmt(950 * 2)
        } else if (comm2 !== "UNSC") {
            setAmt(950)
            document.getElementById("double-info").classList.remove("shown")
        }

        setComm1(e.target.value)
    }

    const handleSecondaryCommChange = e => {
        if (e.target.value === "UNSC") {
            setAmt(950 * 2)
            document.getElementById("double-info").classList.add("shown")
        } else if (comm1 !== "UNSC") {
            setAmt(950)
            document.getElementById("double-info").classList.remove("shown")
        }

        setComm2(e.target.value)
    }

    const handleDoubleCommChange = e => {
        setComm3(e.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        let result = {}
        const elem = document.getElementById('status')

        const formData = new FormData(event.target)
        if (formData.get("confirmation") !== "on") {
            elem.innerHTML = "Please check the confirmation box to confirm that you have read our Code of Conduct and have filled the form correctly."
            elem.classList.add('error')
            elem.classList.remove('success')
            window.scroll(0, 0)
            return
        }

        if (proof === null) {
            elem.innerHTML = "Please upload a screenshot of your proof of payment in the Proof of Payment box below."
            elem.classList.add('error')
            elem.classList.remove('success')
            window.scroll(0, 0)
            return
        }

        for (let element of [
            document.getElementById("grade"),
            document.getElementById("primary-comm"),
            document.getElementById("secondary-comm")
        ]) {
            if (element.value === "") {
                elem.innerHTML = `Field not filled: ${purify(element.name)}`
                elem.classList.add('error')
                elem.classList.remove('success')
                window.scroll(0, 0)
                return
            }
        }

        if (comm1 === "UNSC" || comm2 === "UNSC") {
            for (let element of [
                document.getElementById("double-primary-comm"),
                document.getElementById("double-grade")
            ]) {
                if (element.value === "") {
                    elem.innerHTML = `Field not filled: ${purify(element.name)}`
                    elem.classList.add('error')
                    elem.classList.remove('success')
                    window.scroll(0, 0)
                    return
                }
            }
        }

        for (let item of formData) {
            let [key, value] = [item[0], item[1]]

            if (value === "" && !(
                key.includes('prior_experience') ||
                (key.includes('double') &&
                !(comm1 === "UNSC" || comm2 === "UNSC"))
            )) {
                elem.innerHTML = `Field not filled: ${purify(key)}`
                elem.classList.add('error')
                elem.classList.remove('success')
                window.scroll(0, 0)
                return
            }

            if ((key === 'phone_number' && value.length !== 10) || (key === 'double_phone_number' && value.length !== 10 && (comm1 === "UNSC" || comm2 === "UNSC"))) {
                elem.innerHTML = `Please enter a 10-digit long phone number in the field: ${purify(key)}`
                elem.classList.add('error')
                elem.classList.remove('success')
                window.scroll(0, 0)
                return
            }

            if (key !== "proof") { result[key] = value }
        }

        result["double_grade"] = doubleGrade
        result["double_primary_comm"] = comm3

        let json = JSON.stringify(result)

        const postData = new FormData()
        postData.append("registration_data", json)
        postData.append("payment", proof)

        fetch("indi", {
            method: 'POST',
            body: postData
        })
            .then(response => response.json())
            .then(data => {
                const [status, response] = data
                const elem = document.getElementById('status')
                if (status === 1) {
                    elem.innerHTML = response
                    elem.classList.add('error')
                    elem.classList.remove('success')
                } else {
                    const link = document.createElement('a');
                    link.href = '/thank-you';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            })

        window.scroll(0, 0)
    }

    return (<div>
        <div className='form-page'>
            <h1>Individual Registration</h1>
            {/* <h2>Reopening by tonight!</h2> */}
            <form id="registration-form" onSubmit={handleSubmit}>
                <h2 id='status'></h2>
                <label>General</label>
                <input name="name" type='text' id="name" placeholder='Name' className='textinput'></input>
                <input name="email" type='email' id="email" placeholder='E-Mail' className='textinput'></input>
                <input name="phone_number" type='tel' id="phone-no" placeholder='Phone Number (10 Digit)' className='textinput'></input>
                <input name="school" type='text' id="school" placeholder='School' className='textinput'></input>
                <select name="grade" id="grade">
                    <option value={""} disabled selected className="select-placeholder">Select your grade</option>
                    <option value={9}>Grade 9</option>
                    <option value={10}>Grade 10</option>
                    <option value={11}>Grade 11</option>
                    <option value={12}>Grade 12</option>
                </select>

                <label>Allotment Preferences</label>
                <div id="allotment-preferences">
                    <select name="primary_comm" id="primary-comm" onChange={handlePrimaryCommChange}>
                        <option value={""} disabled selected className="select-placeholder">Primary Committee Preference</option>
                        <option value={"Committee X"}>Committee X</option>
                        <option value={"CCC"}>CCC</option>
                        <option value={"DISEC"}>DISEC</option>
                        <option value={"IPC"}>IPC</option>
                        <option value={"Lok Sabha"}>Lok Sabha</option>
                        <option value={"UNHRC"}>UNHRC</option>
                        <option value={"UNSC"}>UNSC</option>
                    </select>

                    <select name="secondary_comm" id="secondary-comm" onChange={handleSecondaryCommChange}>
                        <option value={""} disabled selected className="select-placeholder">Secondary Committee Preference</option>
                        <option value={"Committee X"}>Committee X</option>
                        <option value={"CCC"}>CCC</option>
                        <option value={"DISEC"}>DISEC</option>
                        <option value={"IPC"}>IPC</option>
                        <option value={"Lok Sabha"}>Lok Sabha</option>
                        <option value={"UNHRC"}>UNHRC</option>
                        <option value={"UNSC"}>UNSC</option>
                    </select>

                    <input name="primary_country" type='text' list='primary-portfolio' id="primary-portfolio-input" placeholder='Portfolio Preference'/>

                    <input name="secondary_country" type='text' list='secondary-portfolio' id="secondary-portfolio-input" placeholder='Portfolio Preference'/>

                    <input name="primary_country_2" type='text' list='primary-portfolio2' id="primary-portfolio-input2" placeholder='Second Portfolio Preference'/>

                    <input name="secondary_country_2" type='text' list='secondary-portfolio2' id="secondary-portfolio-input2" placeholder='Second Portfolio Preference'/>
                </div>

                <label>Experience</label>
                <textarea name="prior_experience" id="prior-exp" placeholder='Prior Experience (Leave Blank if None)' rows={4}></textarea>

                <div className='double-info' id="double-info">
                    <h2>Partner's Information for UNSC</h2>
                    <label>General</label>
                    <input name="double_name" type='text' id="double-name" placeholder={'Partner\'s Name'} className='textinput'></input>
                    <input name="double_email" type='email' id="double-email" placeholder={'Partner\'s E-Mail'} className='textinput'></input>
                    <input name="double_phone_number" type='text' id="double-phone-no" placeholder={'Partner\'s Phone Number'} className='textinput'></input>
                    <select name="double_grade" id="double-grade" onChange={e => setDoubleGrade(e.target.value)}>
                        <option value={""} disabled selected className="select-placeholder">Select your partner's grade</option>
                        <option value={9}>Grade 9</option>
                        <option value={10}>Grade 10</option>
                        <option value={11}>Grade 11</option>
                        <option value={12}>Grade 12</option>
                    </select>

                    <label>Allotment Preferences</label>
                    <div id="double-allotment-preferences">
                        <select name="double_primary_comm" id="double-primary-comm" onChange={handleDoubleCommChange}>
                            <option value={""} disabled selected className="select-placeholder">Committee Preference</option>
                            <option value={"Committee X"}>Committee X</option>
                            <option value={"CCC"}>CCC</option>
                            <option value={"DISEC"}>DISEC</option>
                            <option value={"IPC"}>IPC</option>
                            <option value={"Lok Sabha"}>Lok Sabha</option>
                            <option value={"UNHRC"}>UNHRC</option>
                            <option value={"UNSC"}>UNSC</option>
                        </select>

                        <input name="double_primary_country" type='text' list='double-primary-portfolio' id="double-primary-portfolio-input" placeholder='Portfolio Preference'/>

                        <input name="double_secondary_country" type='text' list='double-secondary-portfolio' id="double-secondary-portfolio-input" placeholder='Second Portfolio Preference'/>
                    </div>

                    <label>Experience</label>
                    <textarea name="double_prior_experience" id="double-prior-exp" placeholder={'Partner\'s Prior Experience (Leave Blank if None)'} rows={4}></textarea>
                </div>

                <p className='payment-details'>
                    Please pay a sum of Rs. {amt} to the following:
                </p>
                <a href={QRCode} target='_blank'><img style={{width: '20vh'}} src={QRCode}></img></a>
                <p className='payment-details'>
                    Proof of Payment:
                </p>
                <p className='payment-details'>
                    Note: Please mention the school and your name when paying to the QR Code and as a note on the payment site.
                </p>
                <input name="proof" type="file" id="proof" onChange={(event) => {
                    setproof(event.target.files[0])
                }}></input>
                <div>
                    <input name="confirmation" type="checkbox" id="confirmation"></input>
                    <label for="confirmation" style={{fontSize: "1.25vh"}}>I confirm that I have read and understood the <a href={CodeOfConduct} style={{color: "#aaa", textDecoration: "none"}} target='_blank'>Code of Conduct</a> and filled this form correctly</label>
                </div>
                <input type="submit" id="submit"></input>
            </form>
        </div>
        <Contact></Contact>
    </div>)
}