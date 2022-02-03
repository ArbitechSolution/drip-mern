const mongoose = require("mongoose");
const {Schema} = require('mongoose');
// const Refral = require("./refrealSchema")
const OwnerrefrealSchema = mongoose.Schema({
    ownerRefreal:{
        type:String,
        required:true

    },
    TreeReferral : [{
        type:Schema.Types.ObjectId,
        ref:"TreeReferral",
        required:true
    }]
});

let OwnerRefrelaModal = mongoose.model("OwnerRefreal", OwnerrefrealSchema);
module.exports = OwnerRefrelaModal;