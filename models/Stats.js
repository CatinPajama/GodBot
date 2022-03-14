const mongoose = require('mongoose')

stats = new mongoose.Schema({
    "username" : {
        type : String,
        required : false
    },
    "userid" : {
        type : String,
        required : true
    },
    "lvl" : {
        type : Number,
        required : false
    },
    "exp" : {
        type : Number,
        required : false
    }

})

module.exports = mongoose.model('stats', stats)
