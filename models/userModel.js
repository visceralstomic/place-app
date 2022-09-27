const mongoose = require('mongoose');
const crypt = require('bcryptjs');



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
        maxlength: 25,
        minlength: 3
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        maxlength: 50,
        minlength: 10
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,,
            "Please provide valid email"
        ],
        unique: true
    }
});

userSchema.pre('save', async function() {
    const salt = await crypt.genSalt(10);
    this.password = await crypt.hash(this.password, salt); 
})



module.exports = mongoose.model('User', userSchema);