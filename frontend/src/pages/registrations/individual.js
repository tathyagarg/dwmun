import { useState } from 'react'
import '../../styles/registration_pages.css'

export default function IndividualRegistration() {
    const [proof, setproof] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault()

        const formData = new FormData();
        // formData.append('registration_data', JSON.stringify({
        //     name: "Tathya Garg",
        //     email: "tathya.garg@gmail.com",
        //     phone_number: "6363037565",
        //     school: "Delhi Public School, Whitefield",
        //     grade: 10,
        //     primary_comm: "CCC",
        //     primary_country: "Russia",
        //     secondary_comm: "UNHRC",
        //     secondary_country: "USA"
        // }))
        formData.append("name", "Tathya Garg")
        formData.append("email", "tathya.garg@gmail.com")
        formData.append("phone_number", "6363037565")
        formData.append("school", "Delhi Public School, Whitefield")
        formData.append("grade", 10)
        formData.append("primary_comm", "CCC")
        formData.append("primary_country", "Russia")
        formData.append("secondary_comm", "UNSC")
        formData.append("secondary_country", "USA")
        formData.append('payment', proof)

        const qs = new URLSearchParams(formData).toString();
        // const form = document.getElementById("registration-form")

        fetch("individual?" + qs, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {alert(JSON.stringify(data))})
            .catch(error => {
                console.error(error)
            })
    }

    return (<div>
        <form id="registration-form" onSubmit={handleSubmit}>
            <input type="file" id="proof" onChange={(event) => {
                setproof(event.target.files[0])
            }}></input>
            <input type="submit"></input>
        </form>

        <button onClick={async () => {
            fetch("individual")
                .then(res => res.json())
                .then(data => console.log(data))
        }}>GET</button>
    </div>)
}