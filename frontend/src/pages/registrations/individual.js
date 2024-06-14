import { useState } from 'react'
import '../../styles/registration_pages.css'
import Contact from '../../components/contact'

export default function IndividualRegistration() {
    const [proof, setproof] = useState(null);
    const [options, setOptions] = useState(<option value={""} disabled selected>Loading...</option>)
    const [options2, setOptions2] = useState(<option value={""} disabled selected>Loading...</option>)

    const handlePrimaryCommChange = e => {
        console.log("Changed");

        fetch(`/matricies/${e.target.value}`)
            .then(response => response.json())
            .then(data => {
                const option_lis = data.map((opt) => <option key={opt}>{opt}</option>)

                setOptions(option_lis)
            })
    }

    const handleSecondaryCommChange = e => {
        console.log("Changed");

        fetch(`/matricies/${e.target.value}`)
            .then(response => response.json())
            .then(data => {
                const option_lis = data.map((opt) => <option key={opt}>{opt}</option>)

                setOptions2(option_lis)
            })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        let result = {}

        const formData = new FormData(event.target)
        formData.forEach((value, key) => {
            if (value == "" && key !== "prior_experience") {
                alert("Fill in all the fields")
            }
            if (key !== "proof") { result[key] = value }
        })

        let json = JSON.stringify(result)

        const postData = new FormData()
        postData.append("registration_data", json)
        postData.append("payment", proof)

        const qs = new URLSearchParams(postData).toString()

        fetch("individual?" + qs, {
            method: 'POST',
            body: postData
        })
            .then(response => response.json())
            .then(data => {alert(JSON.stringify(data))})
            .catch(error => {
                console.error(error)
            })
    }

    return (<div>
        <div className='form-page'>
            <h1>Individual Registration</h1>
            <form id="registration-form" onSubmit={handleSubmit}>
                <label>General</label>
                <input name="name" type='text' id="name" placeholder='Name' className='textinput'></input>
                <input name="email" type='email' id="email" placeholder='E-Mail' className='textinput'></input>
                <input name="phone_number" type='text' id="phone-no" placeholder='Phone Number' className='textinput'></input>
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
                        <option value={"Board-Room"}>Board Room</option>
                        <option value={"CCC"}>CCC</option>
                        <option value={"DISEC"}>DISEC</option>
                        <option value={"IPC"}>IPC</option>
                        <option value={"Lok-Sabha"}>Lok Sabha</option>
                        <option value={"UNHRC"}>UNHRC</option>
                        <option value={"UNSC"}>UNSC</option>
                    </select>

                    <select name="secondary_comm" id="secondary-comm" onChange={handleSecondaryCommChange}>
                        <option value={""} disabled selected className="select-placeholder">Secondary Committee Preference</option>
                        <option value={"Board-Room"}>Board Room</option>
                        <option value={"CCC"}>CCC</option>
                        <option value={"DISEC"}>DISEC</option>
                        <option value={"IPC"}>IPC</option>
                        <option value={"Lok-Sabha"}>Lok Sabha</option>
                        <option value={"UNHRC"}>UNHRC</option>
                        <option value={"UNSC"}>UNSC</option>
                    </select>

                    <input name="primary_country" type='text' list='primary-portfolio' id="primary-portfolio-input"/>
                    <datalist id="primary-portfolio">
                        {options}
                    </datalist>

                    <input name="secondary_country" type='text' list='secondary-portfolio' id="secondary-portfolio-input"/>
                    <datalist id="secondary-portfolio">
                        {options2}
                    </datalist>
                </div>

                <label>Experience</label>
                <textarea name="prior_experience" id="prior-exp" placeholder='Prior Experience (Leave Blank if None)' rows={4}></textarea>

                <label>Proof of Payment</label>
                <p>
                    Lot of Payment detail stuff here
                </p>
                <div style={{height: '20vh', width: "20vh", backgroundColor: "red"}}>QR CODE</div>
                <p>
                    More Payment details mhmhmhm
                </p>
                <input name="proof" type="file" id="proof" onChange={(event) => {
                    setproof(event.target.files[0])
                }}></input>
                <div>
                    <input name="confirmation" type="checkbox" id="confirmation"></input>
                    <label for="confirmation" style={{fontSize: "1.25vh"}}>I confirm that I have read and understood the Code of Conduct (???) and filled this form correctly</label>
                </div>
                <input type="submit"></input>
            </form>
        </div>
        <Contact></Contact>
    </div>)
}