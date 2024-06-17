import React, { useState } from "react";
import DelegateRegistration from "../../components/delegate_registration";

export default function DelegationRegistration() {
    const [proof, setproof] = useState(null);
    const [options, setOptions] = useState(<option value={""} disabled selected>Loading...</option>)
    const [options2, setOptions2] = useState(<option value={""} disabled selected>Loading...</option>)
    const [options3, setOptions3] = useState(<option value={""} disabled selected>Loading...</option>)
    const [comm1, setComm1] = useState("")
    const [comm2, setComm2] = useState("")
    const [delegates, setDelegates] = useState([])

    const purify = (word) => {
        return word
            .toLowerCase()
            .split('_')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ')
            .replace("Double", "Partner's")
    }

    const handlePrimaryCommChange = e => {
        if (e.target.value === "UNSC") {
            document.getElementById("double-info").classList.add("shown")
        } else if (comm2 !== "UNSC") {
            document.getElementById("double-info").classList.remove("shown")
        }

        fetch(`/matricies/${e.target.value}`)
            .then(response => response.json())
            .then(data => {
                const option_lis = data.map((opt) => <option key={opt}>{opt}</option>)

                setOptions(option_lis)
            })

        setComm1(e.target.value)
    }

    const handleSecondaryCommChange = e => {
        if (e.target.value === "UNSC") {
            document.getElementById("double-info").classList.add("shown")
        } else if (comm1 !== "UNSC") {
            document.getElementById("double-info").classList.remove("shown")
        }

        fetch(`/matricies/${e.target.value}`)
            .then(response => response.json())
            .then(data => {
                const option_lis = data.map((opt) => <option key={opt}>{opt}</option>)

                setOptions2(option_lis)
            })

        setComm2(e.target.value)
    }

    const handleDoubleCommChange = e => {
        fetch(`/matricies/${e.target.value}`)
            .then(response => response.json())
            .then(data => {
                const option_lis = data.map((opt) => <option key={opt}>{opt}</option>)

                setOptions3(option_lis)
            })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const allFormData = delegates.map(ref => ref.current.getFormData().name)

        // let result = {}

        // const formData = new FormData(event.target)
        // formData.forEach((value, key) => {
        //     if (value == "" && key !== "prior_experience") {
        //         alert("Fill in all the fields")
        //     }
        //     if (key !== "proof") { result[key] = value }
        // })

        // let json = JSON.stringify(result)

        // const postData = new FormData()
        // postData.append("registration_data", json)
        // postData.append("payment", proof)

        // const qs = new URLSearchParams(postData).toString()

        // fetch("individual?" + qs, {
        //     method: 'POST',
        //     body: postData
        // })
        //     .then(response => response.json())
        //     .then(data => {alert(JSON.stringify(data))})
        //     .catch(error => {
        //         console.error(error)
        //     })
    }

    return (<div>
        <div className='form-page'>
            <h1>Delegation Registration</h1>
            <form id="registration-form" onSubmit={handleSubmit}>
                <ul className="instructions">
                    <li>Do this</li>
                    <li>And Do this</li>
                </ul>
                <h2>Head Delegate Information</h2>
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
                        <option value={"Board Room"}>Board Room</option>
                        <option value={"CCC"}>CCC</option>
                        <option value={"DISEC"}>DISEC</option>
                        <option value={"IPC"}>IPC</option>
                        <option value={"Lok Sabha"}>Lok Sabha</option>
                        <option value={"UNHRC"}>UNHRC</option>
                        <option value={"UNSC"}>UNSC</option>
                    </select>

                    <select name="secondary_comm" id="secondary-comm" onChange={handleSecondaryCommChange}>
                        <option value={""} disabled selected className="select-placeholder">Secondary Committee Preference</option>
                        <option value={"Board Room"}>Board Room</option>
                        <option value={"CCC"}>CCC</option>
                        <option value={"DISEC"}>DISEC</option>
                        <option value={"IPC"}>IPC</option>
                        <option value={"Lok Sabha"}>Lok Sabha</option>
                        <option value={"UNHRC"}>UNHRC</option>
                        <option value={"UNSC"}>UNSC</option>
                    </select>

                    <input name="primary_country" type='text' list='primary-portfolio' id="primary-portfolio-input" placeholder='Portfolio Preference'/>
                    <datalist id="primary-portfolio">
                        {options}
                    </datalist>

                    <input name="secondary_country" type='text' list='secondary-portfolio' id="secondary-portfolio-input" placeholder='Portfolio Preference'/>
                    <datalist id="secondary-portfolio">
                        {options2}
                    </datalist>

                    <input name="primary_country_2" type='text' list='primary-portfolio2' id="primary-portfolio-input2" placeholder='Second Portfolio Preference'/>
                    <datalist id="primary-portfolio2">
                        {options}
                    </datalist>

                    <input name="secondary_country_2" type='text' list='secondary-portfolio2' id="secondary-portfolio-input2" placeholder='Second Portfolio Preference'/>
                    <datalist id="secondary-portfolio2">
                        {options2}
                    </datalist>
                </div>

                <label>Experience</label>
                <textarea name="prior_experience" id="prior-exp" placeholder='Prior Experience (Leave Blank if None)' rows={4}></textarea>

                <div className='double-info' id="double-info">
                    <h2>Partner's Information for UNSC</h2>
                    <label>General</label>
                    <input name="double_name" type='text' id="double-name" placeholder={'Partner\'s Name'} className='textinput'></input>
                    <input name="double_email" type='email' id="double-email" placeholder={'Partner\'s E-Mail'} className='textinput'></input>
                    <input name="double_phone_number" type='text' id="double-phone-no" placeholder={'Partner\'s Phone Number'} className='textinput'></input>
                    <select name="double_grade" id="double-grade">
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
                            <option value={"Board Room"}>Board Room</option>
                            <option value={"CCC"}>CCC</option>
                            <option value={"DISEC"}>DISEC</option>
                            <option value={"IPC"}>IPC</option>
                            <option value={"Lok Sabha"}>Lok Sabha</option>
                            <option value={"UNHRC"}>UNHRC</option>
                            <option value={"UNSC"}>UNSC</option>
                        </select>

                        <input name="double_primary_country" type='text' list='double-primary-portfolio' id="double-primary-portfolio-input" placeholder='Portfolio Preference'/>
                        <datalist id="double-primary-portfolio">
                            {options3}
                        </datalist>

                        <input name="double_secondary_country" type='text' list='double-secondary-portfolio' id="double-secondary-portfolio-input" placeholder='Second Portfolio Preference'/>
                        <datalist id="double-secondary-portfolio">
                            {options3}
                        </datalist>
                    </div>

                    <label>Experience</label>
                    <textarea name="double_prior_experience" id="double-prior-exp" placeholder={'Partner\'s Prior Experience (Leave Blank if None)'} rows={4}></textarea>
                </div>

                <div className="sub-delegates" id="sub-delegates">
                    {delegates.map((ref, index) => <DelegateRegistration elemNo={index+1} ref={ref}/>)}
                </div>

                <button className="add-sub-delegate" type="button" onClick={() => {
                    setDelegates([...delegates, React.createRef()])
                }}>+</button>

                <label>Proof of Payment</label>
                <p className='payment-details'>
                    Lot of Payment detail stuff here
                </p>
                <div style={{height: '20vh', width: "20vh", backgroundColor: "red"}}>QR CODE</div>
                <p className='payment-details'>
                    More Payment details mhmhmhm
                </p>
                <input name="proof" type="file" id="proof" onChange={(event) => {
                    setproof(event.target.files[0])
                }}></input>
                <div>
                    <input name="confirmation" type="checkbox" id="confirmation"></input>
                    <label for="confirmation" style={{fontSize: "1.25vh"}}>I confirm that I have read and understood the Code of Conduct (???) and filled this form correctly</label>
                </div>
                <input type="submit" id="submit"></input>
            </form>
        </div>
    </div>)
}