/*importing required modules
Creation of Database
Verifying and Validating new sign up
*/
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const mongoose = require("mongoose");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    //console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    //console.error("Connection error", err);
    process.exit();
  });

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

//Setting up port for both local and environment for hosting
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


var connection2    = mongoose.createConnection('mongodb://localhost/Database');

var UserName = "";

var Patient    = connection2.model('Patients',
 new mongoose.Schema({
  username: String,
  email: String,
  password: String
}));

app.post('/Patient', (req, res) => {
  var data = new Patient(req.body);
  console.log(data)
  const username = req.body.username;
  const email = req.body.email;

  Patient.findOne({email, email}, async (err, found) => {
    try{
      if(found.username === username) {
        //console.log("Username already exist")
        res.send(data)
        
      }
      else if(found.email === email)
        {
        //console.log("Email already exist")
        res.send("EmailExist")
      }
    }
    catch(err){
      //console.log("Registered")
      res.send("Registered")
      data.save()
    }
  })
})

var Doctor    = connection2.model('Doctor',
 new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  specialization: String
}));

app.post('/Doctor', (req, res) => {
  var data = new Doctor(req.body);
  console.log(data)
  const username = req.body.username;
  const email = req.body.email;
  Doctor.findOne({email, email}, async (err, found) => {
    try{
      if(found.username === username) {
        console.log("Username already exist")
        res.send("UsernameExist")
        
      }
      else if(found.email === email)
        {
        console.log("Email already exist")
        res.send("EmailExist")
      }
    }
    catch(err){
      console.log("Registered")
      res.send("Registered")
      data.save()
    }
  })
})

var Admin = connection2.model('Admin',
 new mongoose.Schema({
  username: String,
  email: String,
  password: String,
}));

app.post('/Admin', (req, res) => {
  var data = new Admin(req.body);
  console.log(data)
  const username = req.body.username;
  const email = req.body.email;
  Admin.findOne({email, email}, async (err, found) => {
    try{
      if(found.username === username) {
        console.log("Username already exist")
        res.send("UsernameExist")
        
      }
      else if(found.email === email)
        {
        console.log("Email already exist")
        res.send("EmailExist")
      }
    }
    catch(err){
      console.log("Registered")
      res.send("Registered")
      data.save()
    }
  })
})

var Appointment = connection2.model('Appointments',
 new mongoose.Schema({
  patient_id: String,
  date: Date,
  time: String,
  specialization: String
}));

app.post('/Appointment', (req, res) => {
  var data = new Appointment(req.body);
  console.log(req.body);
  //data.save()
})

app.post('/getName', (req, res) => {
  var name = req.body
  UserName = req.body.username
  console.log(UserName)
})  

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });
    }
  });
}
