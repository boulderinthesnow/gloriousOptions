var mongoose = require("mongoose");

var itemSchema = new mongoose.Schema({
                    name: {type: String, required: true},                      
                    review: {type: String, required: false},                      
                    user: {
                      type: mongoose.Schema.Types.ObjectId,
                      ref: "User"
                    },
                    restaurant: {
                      type: mongoose.Schema.Types.ObjectId,
                      ref: "Restaurant"
                    },

                  });


var Item = mongoose.model("Comment", itemSchema);

module.exports = Item;