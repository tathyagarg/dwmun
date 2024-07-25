import '../styles/login.css'
import { useState } from 'react'

export default function LoginPage() {
    const [data, setData] = useState()

    const handleSubmit = async () => {
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        const qs = `username=${username}&password=${password}`

        const postData = new FormData()
        postData.append("file", data)

        const resp = await fetch("mail?" + qs, {
            method: "POST",
            body: postData
        })

        if (!resp.ok) {
            const status = document.getElementById("status")
            status.classList.add("error")
            status.innerHTML = "Some error"
            alert(JSON.stringify(await resp.json()))
            return
        }

        const blob = await resp.blob()
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'data.xlsx';

        document.body.appendChild(link);
        link.click()
        document.body.removeChild(link);

        fetch("mail", {
            method: 'DELETE'
        })

        window.location.reload()
    }

    return (<div className="login-page">
        <h1 className='header'>Login</h1>
        <h2 id="status"></h2>
        <p style={{textAlign: "center"}}>OC Members only</p>
        <form>
            <input name='username' id="username" placeholder='Username'></input>
            <div style={{width: "100%"}}>
                <input style={{width: "90%"}} id="password" name='password' type='password' placeholder='Password'></input>
                <button type='button' style={{width: "10%"}} onClick={() => {
                    const pw = document.getElementById("password")
                    pw.type = pw.type === 'text' ? 'password' : 'text'
                }}>Toggle</button>
            </div>
            <input type='file' onChange={(event) => {
                setData(event.target.files[0])
            }}></input>
            <button type='button' onClick={handleSubmit} className='login-submit'>Submit</button>
        </form>
    </div>)
}