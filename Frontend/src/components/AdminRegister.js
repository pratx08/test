/*
Registration of Admin.
Verification is done based on the inputs.
Notifies if the username or email already exists in database or not.
Has a form for registering Admin with proper details
*/
import axios from "./axios.js";
import React, { useState } from "react";
import "./Register.css"
function AdminRegister () {
    const [input, setInput] = useState({
        username:"",
        email:"",
        password:"",
    })

    function handle (e) {
        const newData = {...input}
        newData[e.target.id] = e.target.value
        setInput(newData)
        console.log(newData)
    }
    const submit = (e) => {
        e.preventDefault();
        axios.post('/Admin', {
            username: input.username,
            email: input.email,
            password: input.password,
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
                        <input type="text" onChange={(e) => handle(e)} id="username" value={input.username}></input><br/>
                    </div>
                    <div>
                        <label>Email<span>&#42;</span></label>
                        <input type="text" onChange={(e) => handle(e)} id="email" value={input.email}></input><br/>
                    </div>
                    <div>
                        <label>Password<span>&#42;</span></label>
                        <input type="text" onChange={(e) => handle(e)} id="password" value={input.password}></input><br/><br/>
                    </div>
                    <button type="submit" onClick={submit}>REGISTER</button>
                </div>
            </div>
        </div>
    )
};

export default AdminRegister;