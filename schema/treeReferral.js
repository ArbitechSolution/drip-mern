const mongoose = require("mongoose");

const ref = mongoose.Schema({
    owner:{
        type:String,
        require:true
    },
    referrals:[
        {
        type:String,
        
    }],
})

let treeReferral = mongoose.model("TreeReferral", ref);
module.exports = treeReferral;