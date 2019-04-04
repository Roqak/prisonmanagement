const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PrisonSchema = new Schema({
    cell:{ 
        type: Number,
        required: true
    },
    inmate: {
        type: String
    },
    occupied: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = Prison = mongoose.model('prison',PrisonSchema);