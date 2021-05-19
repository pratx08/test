/*
Page to make appointment schedules.
Takes in patient id, date and time of appointment, specialization.
Also the past dates from current date has disabled.
Time slots are visible only if it exists. If its past the time those time slots are not visible.
Can select specific specialized doctor whom the patient wants to meet.
*/
import axios from "./axios.js";
import React, { Component, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./ScheduleAppointment.css"
import Calendar from "react-calendar"
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'


const Appointment = () => {

    let today = new Date();
    let year = today.getFullYear();
    let hour = today.getHours();

    const[selectedDate, setSelectedDate] = useState(today);
    const[input, setInput] = useState({
      patient_name:"",
      date: selectedDate,
      time: String,
      specialization: ""
  })

  function inputHandler (e) {
    const newData = {...input}
    newData[e.target.name] = e.target.value
    setInput(newData)
    console.log(newData)
}

  let dateSelected = selectedDate;
  let daySelected = dateSelected.getDate();
  let monthSelected = dateSelected.getMonth()+1;
  let yearSelected = dateSelected.getFullYear();
  let final = daySelected+"-"+monthSelected+"-"+yearSelected


  const func = () => {
    axios.post('/Appointment', {
      patient_name: String(input.patient_name),
      date: final,
      specialization: input.specialization
    }).then( res => {
      console.log("Sent")
    }).catch(e => {
      console.log("Error");
    })
  } 
    return (
      <div className="outer-box">
        <h1>Schedule Appointments</h1>
          <div className="Form">
          <div>
            <label>Patient Name<span>&#42;</span></label>
            <input type="text" name="patient_name" value={input.patient_name} onChange={inputHandler} ></input>
          </div>
          
          <div>
            <label>Appointment Date<span>&#42;</span></label>
            <DatePicker minDate={today} dateFormat='dd/MM/yyyy' selected={selectedDate} onChange={date => setSelectedDate(date)} value={selectedDate}/>
          </div><br/>
          <p>Time Slot</p>
          <div className="Timings">
            
            {(hour !== 10) && <button className="slot" value="1">10:00-10:30</button>}&nbsp;&nbsp;
            {(hour !== 11) && <button className="slot" value="2">11:00-11:30</button>}&nbsp;&nbsp;
            {(hour !== 12) && <button className="slot" value="3">12:00-12:30</button>}&nbsp;&nbsp;
          </div>
          <br/>
          <div className="Timings">
          {(hour !== 4) && <button className="slot" value="4">4:00-4:30</button>}&nbsp;&nbsp;
          {(hour !== 5) && <button className="slot" value="5">5:00-5:30</button>}&nbsp;&nbsp;
          {(hour !== 6) && <button className="slot" value="6">6:00-6:30</button>}&nbsp;&nbsp;
          </div>
          
          <br/>
          <div>
            <label>Appointment With<span>&#42;</span></label>
            <select name="specialization" value={
              input.specialization} onChange={inputHandler}>
              <option value="0">Select</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Dentist">Dentist</option>
              <option value="Opthamologist">Opthamologist</option>
            </select>
          </div>
          
          <br/>
          <button type="submit" onClick={func}>SCHEDULE</button>
        </div>
      </div>
    );
  }
export default Appointment;
