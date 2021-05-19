/*
Configuring the Database Models and Roles
*/

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./ParticipantsModel");
db.role = require("./role.model");

db.ROLES = ["patient", "admin", "doctor"];

module.exports = db;