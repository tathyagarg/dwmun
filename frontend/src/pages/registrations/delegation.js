import React, { useState } from "react";
import DelegateRegistration from "../../components/delegate_registration";
import CodeOfConduct from '../../assets/DWMUN\'24\ Code\ of\ Conduct.pdf'
import QRCode from "../../assets/qr-code.jpeg"

export default function DelegationRegistration() {
    const [proof, setproof] = useState(null);
    const [comm1, setComm1] = useState("")
    const [comm2, setComm2] = useState("")
    const [comm3, setComm3] = useState("")
    const [delegates, setDelegates] = useState([])
    const [grade, setGrade] = useState(0)
    const [doubleGrade, setDoubleGrade] = useState(0)
    const [amt, setAmt] = useState(950)

    const [doubleCount, setDoubleCount] = useState(0)

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
            setDoubleCount((prev) => prev + 1)
        } else if (comm1 !== "UNSC") {
            if (document.getElementById("double-info").classList.contains("shown")) {setDoubleCount((prev) => prev - 1)}
            document.getElementById("double-info").classList.remove("shown")
        }

        setComm1(e.target.value)
    }

    const handleSecondaryCommChange = e => {
        if (e.target.value === "UNSC") {
            document.getElementById("double-info").classList.add("shown")
            setDoubleCount((prev) => prev + 1)
        } else if (comm1 !== "UNSC") {
            if (document.getElementById("double-info").classList.contains("shown")) {setDoubleCount((prev) => prev - 1)}
            document.getElementById("double-info").classList.remove("shown")
        }

        setComm2(e.target.value)
    }

    const handleDoubleCommChange = e => {
        setComm3(e.target.value)
    }

    const triggerError = (element) => {
        element.classList.add('error')
        element.classList.remove('success')

        return window.scroll(0, 0)
    }

    const getTotalDelegateCount = () => {
        let count = delegates.length + doubleCount + 1;

        for (let delegate of delegates.map(ref => ref.current.getFormData())) {
            if (delegate.primary_comm === "UNSC" || delegate.secondary_comm === "UNSC") {
                if (delegate.double_name !== "" || delegate.double_email !== "" || delegate.double_phone_number !== "") { count += 1 }
            }
        }

        setAmt(950 * count * (count >= 10 ? 0.9 : 1))
    }

    const getDelegateData = (data, isHeadDel, index) => {
        let res = {}
        const statusElement = document.getElementById("status")
        const append = isHeadDel ? "" : ` for Delegate #${index+1}`

        if (isHeadDel && data.get("confirmation") !== "on") {
            statusElement.innerHTML = "Please check the confirmation box to confirm that you have read our Code of Conduct and have filled the form correctly."
            return triggerError(statusElement)
        }

        const toCheck = isHeadDel ? [grade, comm1, comm2] : [data["grade"], data["primary_comm"], data["secondary_comm"]]
        const failure = [0, "", ""]
        const purified = ["Grade", "Primary Committee Preference", "Secondary Committee Preference"]

        for (let i = 0; i < 3; i++) {
            if (toCheck[i] === failure[i]) {
                statusElement.innerHTML = `Field not filled: ${purified[i]}` + append
                return triggerError(statusElement)
            }
        }

        const [uComm1, uComm2] = isHeadDel ? [comm1, comm2] : [data["primary_comm"], data["secondary_comm"]]

        if (uComm1 === "UNSC" || uComm2 === "UNSC") {
            const uDoubleGrade = isHeadDel ? doubleGrade : data["double_grade"]
            if (uDoubleGrade === 0) {
                statusElement.innerHTML = `Field not filled: Partner's Grade` + append
                return triggerError(statusElement)
            }

            const uComm3 = isHeadDel ? comm3 : data["double_primary_comm"]

            if (uComm3 === "") {
                statusElement.innerHTML = `Field not filled: Partner's Committee Preference` + append
                return triggerError(statusElement)
            }
        }

        if (isHeadDel) {
            for (let item of data) {
                let [key, value] = [item[0], item[1]]

                if (value === "" && !(
                    key.includes('prior_experience') ||
                    (key.includes('double') &&
                    !(comm1 === "UNSC" || comm2 === "UNSC"))
                )) {
                    statusElement.innerHTML = `Field not filled: ${purify(key)}` + append
                    return triggerError(statusElement)
                }

                if (key === "phone_number" && value.length !== 10) {
                    const append2 = isHeadDel ? "issue for the Head Delegate" : `issue for Delegate #${index + 1}`
                    statusElement.innerHTML = `Please enter a 10-digit-long phone number for all delegates (${append2})`
                    return triggerError(statusElement)
                }

                if (key === "double_phone_number" && value.length !== 10 && (comm1 === "UNSC" || comm2 === "UNSC")) {
                    const append2 = isHeadDel ? "issue for the Head Delegate's Partner" : `issue for Delegate #${index + 1}'s Partner`
                    statusElement.innerHTML = `Please enter a 10-digit-long phone number for all delegates (${append2})`
                    return triggerError(statusElement)
                }

                if (key !== "proof") {
                    res[key] = value
                }
            }

            res["double_grade"] = doubleGrade
            res["double_primary_comm"] = comm3
        } else {
            for (let [key, value] of Object.entries(data)) {
                if (value === "" && !(
                    key.includes('prior_experience') ||
                    (key.includes('double') &&
                    !(comm1 === "UNSC" || comm2 === "UNSC"))
                )) {
                    statusElement.innerHTML = `Field not filled: ${purify(key)}` + append
                    return triggerError(statusElement)
                }

                if (key === "phone_number" && value.length !== 10) {
                    const append2 = isHeadDel ? "issue for the Head Delegate" : `issue for Delegate #${index + 1}`
                    statusElement.innerHTML = `Please enter a 10-digit-long phone number for all delegates (${append2})`
                    return triggerError(statusElement)
                }

                if (key === "double_phone_number" && value.length !== 10 && (comm1 === "UNSC" || comm2 === "UNSC")) {
                    const append2 = isHeadDel ? "issue for the Head Delegate's Partner" : `issue for Delegate #${index + 1}'s Partner`
                    statusElement.innerHTML = `Please enter a 10-digit-long phone number for all delegates (${append2})`
                    return triggerError(statusElement)
                }

                if (key !== "proof") {
                    res[key] = value
                }
            }
        }

        return res
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const statusElement = document.getElementById("status")

        const allFormData = delegates.map(ref => ref.current.getFormData())

        let res = []

        const headData = new FormData(event.target)

        res.push(JSON.stringify(getDelegateData(headData, true)))

        allFormData.forEach((data, index) => res.push(JSON.stringify(getDelegateData(data, false, index))))

        const postData = new FormData()
        postData.append('registration_data', JSON.stringify(res))
        postData.append('payment', proof)

        const requestData = {
            method: 'POST',
            body: postData
        }

        requestData.body.forEach((value, key) => console.log(`${key}: ${value}`))

        fetch("dele", requestData)
            .then(response => response.json())
            .then(data => {
                const [status, response] = data
                const elem = document.getElementById('status')
                if (status === 1) {
                    elem.innerHTML = response
                    triggerError(statusElement)
                } else {
                    const link = document.createElement('a');
                    link.href = '/thank-you';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            })
    }

    return (<div>
        <div className='form-page'>
            <h1>Delegation Registration</h1>
            <form id="registration-form" onSubmit={handleSubmit}>
                <h2 id="status"></h2>
                <div className="instructions">
                    <h2>Instructions</h2>
                    <hr style={{width: "100%"}}></hr>
                    <ul>
                        <li>To add a delegate's information, click the green plus button <a style={{
                            color: '#00fff0',
                            textDecoration: 'none',
                            cursor: "pointer"
                        }} onClick={() => {
                            const butt = document.getElementById('add-button')
                            window.scroll(butt.offsetHeight, butt.offsetTop - 0.1 * window.innerHeight)

                            butt.classList.remove('pulse')
                            butt.classList.add('pulse')
                            const prom = new Promise((res, rej) => {
                                setTimeout(() => butt.classList.remove('pulse'), 5000)
                            })
                        }}>here</a></li>
                        <li>Before making your payment, click the update button <a style={{
                            color: '#00fff0',
                            textDecoration: 'none',
                            cursor: "pointer"
                        }} onClick={() => {
                            const butt = document.getElementById('update-button')
                            window.scroll(butt.offsetHeight, butt.offsetTop - 0.1 * window.innerHeight)

                            butt.classList.remove('pulse')
                            butt.classList.add('pulse')
                            const prom = new Promise((res, rej) => {
                                setTimeout(() => butt.classList.remove('pulse'), 5000)
                            })
                        }}>here</a> to see the final price.</li>
                    </ul>
                </div>
                <h2>Head Delegate Information</h2>
                <label>General</label>
                <input name="name" type='text' id="name" placeholder='Name' className='textinput'></input>
                <input name="email" type='email' id="email" placeholder='E-Mail' className='textinput'></input>
                <input name="phone_number" type='tel' id="phone-no" placeholder='Phone Number (10 Digit)' className='textinput'></input>
                <input name="school" type='text' id="school" placeholder='School' className='textinput'></input>
                <select name="grade" id="grade" onChange={(e) => {
                    setGrade(e.target.value)
                }}>
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
                    <select name="double_grade" id="double-grade" onChange={(e) => {
                        setDoubleGrade(e.target.value)
                    }}>
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

                <div className="sub-delegates" id="sub-delegates">
                    {delegates.map((ref, index) => <DelegateRegistration elemNo={index+1} ref={ref}/>)}
                </div>

                <button className="add-sub-delegate" id="add-button" type="button" onClick={() => {
                    setDelegates(prev => [...prev, React.createRef()])
                }}>+</button>

                <p>Please click this button before making your payment to see your final price!</p>
                <button className="update" id="update-button" type="button" onClick={getTotalDelegateCount}>Update Amount to Pay</button>

                <p className="payment-details" id="total-amount">Please pay a sum of rupees <b>{amt}</b> to:</p>
                <a href={QRCode} target='_blank'><img style={{width: '20vh'}} src={QRCode}></img></a>
                <p className='payment-details'>
                    Proof of Payment:
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
    </div>)
}