const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InmateSchema = new Schema({
    cell:{ 
        type:String,
        required: false
    },
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    maritalStatus:{
        type: String,
        required: true
    },
    nextofKinName: {
        type: String,
        required: true
    },
    nextofKinAge:{
        type: Number,
        required: true
    },
    nextofKinMail:{
        type: String,
        required: true
    },
    InmateId: {
        type: String,
        required: true
    }
})

module.exports = Inmate = mongoose.model('inmate',InmateSchema);