var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/gloriousOptions_app");

module.exports.User = require("./user");
