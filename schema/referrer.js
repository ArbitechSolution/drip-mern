const mongoose = require("mongoose");


const referralSchema = mongoose.Schema({
    referrer:{
        type:String,
        required:true
    },
    referre:[]
})

let treeReferral = mongoose.model("Referre", referralSchema);
module.exports = treeReferral;