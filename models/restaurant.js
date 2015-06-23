var mongoose = require("mongoose");

var restaurantSchema = new mongoose.Schema({
                    name: {type: String, required: true},            
                    address: {type: String, required: true},
                    hours: {type: String, required: false},
                    cost: {type: String, required: false},
                    user: {
                      type: mongoose.Schema.Types.ObjectId,
                      ref: "User"
                    }
                    // comments: [{
                    //   type: mongoose.Schema.Types.ObjectId,
                    //   ref: "Comment"
                    // }],

                  });

restaurantSchema.pre('remove', function(next) {
  var restaurant = this
   Comment.remove({restaurant: restaurant._id}).exec();
   next();
});

var Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;