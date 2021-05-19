/*
Page to add Admin, Doctor, Patient.
The respective form opens up when the respective buttons are clicked.
*/

import React, { useState } from 'react';
import PatientRegister from "./PatientRegister"
import DoctorRegister from "./DoctorRegister"
import AdminRegister from "./AdminRegister"
import "./addParticipant.css"
function AddParticipants() {
  const [request, setRequest] = useState("");
  return (
    <>
      <div className="outer">
        <div className="btns1">
          <button className="formBtn" onClick={() => setRequest('Patient')}>Patient</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button className="formBtn" onClick={() => setRequest('Doctor')}>Doctor</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button className="formBtn" onClick={() => setRequest('Admin')}>Admin</button>
        </div>
      </div>
      <br/>
      <hr/>
      <div className="B">
        {(request === "Patient") && <PatientRegister/>}
        {(request === "Doctor") && <DoctorRegister/>}
        {(request === "Admin") && <AdminRegister/>}
      </div>
    </>
  )
}
export default AddParticipants;