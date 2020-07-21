const mongoose = require('mongoose');


const citySchema = new mongoose.Schema({
    name: String,
    country: String,
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('City', citySchema);