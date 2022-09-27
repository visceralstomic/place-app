const mongoose = require('mongoose');



const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name of place"],
        maxlength: 70
    },
    location: {
        type: String,
        required: [true, "Please provide name of location"],
        maxlength: 70
    },
    picture: String,
    description:  {
        type: String,
        required: [true, "Please provide name of description"],
        minlength: 10
    },
    rating: {
        type: Number,
        default: 0
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "Please provide user"]
    }
})


module.exports = mongoose.model('Place', placeSchema);