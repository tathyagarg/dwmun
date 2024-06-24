import { forwardRef, useImperativeHandle, useState } from "react"

const DelegateRegistration = forwardRef((props, ref) => {
    const [options, setOptions] = useState(<option value={""} disabled selected>Loading...</option>)
    const [options2, setOptions2] = useState(<option value={""} disabled selected>Loading...</option>)
    const [options3, setOptions3] = useState(<option value={""} disabled selected>Loading...</option>)
    const [comm1, setComm1] = useState("")
    const [comm2, setComm2] = useState("")

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        grade: 0,
        primary_comm: '',
        secondary_comm: '',
        primary_country: '',
        secondary_country: '',
        primary_country_2: '',
        secondary_country_2: '',
        prior_experience: '',
        double_name: '',
        double_email: '',
        double_phone_number: '',
        double_grade: 0,
        double_primary_comm: '',
        double_primary_country: '',
        double_secondary_country: '',
        double_prior_experience: ''
    })

    const handlePrimaryCommChange = e => {
        if (e.target.value === "UNSC") {
            document.getElementById(`double-info-${props.elemNo}`).classList.add("shown")
        } else if (comm2 !== "UNSC") {
            document.getElementById(`double-info-${props.elemNo}`).classList.remove("shown")
        }

        setComm1(e.target.value)
        handleChange(e)
    }

    const handleSecondaryCommChange = e => {
        if (e.target.value === "UNSC") {
            document.getElementById(`double-info-${props.elemNo}`).classList.add("shown")
        } else if (comm1 !== "UNSC") {
            document.getElementById(`double-info-${props.elemNo}`).classList.remove("shown")
        }

        setComm2(e.target.value)
        handleChange(e)
    }

    const handleDoubleCommChange = e => {
        handleChange(e)
    }

    const handleChange = e => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    useImperativeHandle(ref, () => ({
        getFormData() {
            return formData
        }
    }))

    return (<form className="sub-delegate-form" id={`delegate-${props.elemNo}`}>
        <h2>Delegate #{props.elemNo}</h2>
        <label>General</label>
            <input name="name" type='text' id="name" placeholder='Name' className='textinput' onChange={handleChange}></input>
            <input name="email" type='email' id="email" placeholder='E-Mail' className='textinput' onChange={handleChange}></input>
            <input name="phone_number" type='tel' id="phone-no" placeholder='Phone Number (10 Digit)' className='textinput' onChange={handleChange}></input>
            <select name="grade" id="grade" onChange={handleChange}>
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

                <input name="primary_country" type='text' list='primary-portfolio' id="primary-portfolio-input" placeholder='Portfolio Preference' onChange={handleChange}/>
                <datalist id="primary-portfolio">
                    {options}
                </datalist>

                <input name="secondary_country" type='text' list='secondary-portfolio' id="secondary-portfolio-input" placeholder='Portfolio Preference' onChange={handleChange}/>
                <datalist id="secondary-portfolio">
                    {options2}
                </datalist>

                <input name="primary_country_2" type='text' list='primary-portfolio2' id="primary-portfolio-input2" placeholder='Second Portfolio Preference' onChange={handleChange}/>
                <datalist id="primary-portfolio2">
                    {options}
                </datalist>

                <input name="secondary_country_2" type='text' list='secondary-portfolio2' id="secondary-portfolio-input2" placeholder='Second Portfolio Preference' onChange={handleChange}/>
                <datalist id="secondary-portfolio2">
                    {options2}
                </datalist>
            </div>

            <label>Experience</label>
            <textarea name="prior_experience" id="prior-exp" placeholder='Prior Experience (Leave Blank if None)' rows={4} onChange={handleChange}></textarea>

            <div className='double-info' id={`double-info-${props.elemNo}`}>
                <h2>Partner's Information for UNSC</h2>
                <label>General</label>
                <input name="double_name" type='text' id="double-name" placeholder={'Partner\'s Name'} className='textinput' onChange={handleChange}></input>
                <input name="double_email" type='email' id="double-email" placeholder={'Partner\'s E-Mail'} className='textinput' onChange={handleChange}></input>
                <input name="double_phone_number" type='text' id="double-phone-no" placeholder={'Partner\'s Phone Number'} className='textinput' onChange={handleChange}></input>
                <select name="double_grade" id="double-grade" onChange={handleChange}>
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

                    <input name="double_primary_country" type='text' list='double-primary-portfolio' id="double-primary-portfolio-input" placeholder='Portfolio Preference' onChange={handleChange}/>
                    <datalist id="double-primary-portfolio">
                        {options3}
                    </datalist>

                    <input name="double_secondary_country" type='text' list='double-secondary-portfolio' id="double-secondary-portfolio-input" placeholder='Second Portfolio Preference' onChange={handleChange}/>
                    <datalist id="double-secondary-portfolio">
                        {options3}
                    </datalist>
                </div>

                <label>Experience</label>
                <textarea name="double_prior_experience" id="double-prior-exp" placeholder={'Partner\'s Prior Experience (Leave Blank if None)'} rows={4} onChange={handleChange}></textarea>
            </div>
    </form>)
})

export default DelegateRegistration