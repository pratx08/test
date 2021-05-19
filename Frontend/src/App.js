import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "./components/axios.js"
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/PatientDashboard";
import BoardModerator from "./components/DoctorDashboard";
import BoardAdmin from "./components/AdminDashboard";
import AddParticipants from "./components/addParticipant";
import Appointment from "./components/ScheduleAppointment"
//import axios from "axios";
//window.$personName = ""
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      display: false
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    //window.$personName = user.username
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }
  
  logOut() {
    AuthService.logout();
  }

  submit() {
    axios.post('/getName', {
      username: window.$personName
    })
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
            </li>
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Doctor Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/add_participant"} className="nav-link">
                  Add Participants
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/schedule"} className="nav-link">
                  Appointment Schedule
                </Link>
              </li>
            )}

          </div>
      
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        
        {currentUser && !showAdminBoard && !showModeratorBoard && (
            <div className="outerBox">
              <button onClick={this.state.display="app"} className="appointments">View Appointments</button><br/>
              <button className="appointments" onClick={this.state.display="med"}>View Medications</button>
              {(this.state.display === "") && <p>Med</p>}
              {(this.state.display === "app") && <p>App</p>}
            </div>
          )}
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/add_participant" component={AddParticipants} />
            <Route path="/schedule" component={Appointment} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
