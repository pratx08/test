/*
Registration of Patient.
Verification is done based on the inputs.
Notifies if the username or email already exists in database or not.
Has a form for registering Patient with proper details
*/

import React, { useState } from "react";
import axios from "./axios.js"
import "./Register.css"
function PatientRegister () {


    const[input, setInput] = useState({
        patient_id: "",
        patient_email: "",
        patient_password: ""
    })

    function handle(e) {
        const newData = {...input}
        newData[e.target.id] = e.target.value
        setInput(newData)
        console.log(newData)
    }
    const submit = (e) => {
        e.preventDefault();
        axios.post('/Patient', {
            username: input.patient_id,
            email: input.patient_email,
            password: input.patient_password,

        }).then(res => {
            console.log("SENT")
            console.log(res.data)
            if(res.data === "UsernameExist")
            {
                alert("Username already exists")
            }
            else if(res.data === "EmailExist")
            {
                alert("Email already exists")
            }
            else if(res.data === "Registered")
            {
                alert("Registered Succesfully")
            }
            
        }).catch(e => {
            console.log("ERROR")
        })
    }

    return(
        <div>
            <div className="outer-box">
                <div className="box">
                <h2>REGISTER</h2>
                    <div>
                        <label>ID<span>&#42;</span></label>
                        <input type="text" onChange={(e) => handle(e)} id="patient_id" value={input.patient_id} required></input><br/>
                    </div>
                    <div>
                        <label>Email<span>&#42;</span></label>
                        <input type="email" onChange={(e) => handle(e)} id="patient_email" value={input.patient_email} required></input><br/>
                    </div>
                    <div>
                        <label>Password<span>&#42;</span></label>
                        <input type="text" onChange={(e) => handle(e)} id="patient_password" value={input.patient_password}></input><br/><br/>
                    </div>
                    <button type="submit" onClick={submit}>REGISTER</button>
                </div>
            </div>
        </div>
    )
};

export default PatientRegister;