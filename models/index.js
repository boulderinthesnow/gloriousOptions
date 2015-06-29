var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/gloriousOptions_app");
mongoose.connect( process.env.MONGOLAB_URI || "mongodb://localhost/gloriousoptions")

module.exports.User = require("./user");
module.exports.Restaurant = require("./restaurant");
