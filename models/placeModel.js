const mongoose = require('mongoose');



const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name of place"],
        maxlength: [70, 'Name value must be no bigger than 70 characters']
    },
    location: {
        type: String,
        required: [true, "Please provide name of location"],
        maxlength: [70, 'Location value must be no bigger than 70 characters']
    },
    picture: {
        type: String,
        default: "empty.png"
    },
    description:  {
        type: String,
        trim: true,
        required: [true, "Please provide name of description"],
        minlength: [10, 'Description Value must be at least 10 characters long']
    },
    rating: {
        type: Number,
        default: 0
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "Please provide user"]
    },
}, {timestamps: true})


module.exports = mongoose.model('Place', placeSchema);